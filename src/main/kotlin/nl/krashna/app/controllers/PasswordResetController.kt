package nl.krashna.app.controllers

import net.sargue.mailgun.Configuration
import net.sargue.mailgun.Mail
import nl.krashna.app.models.PasswordResetToken
import nl.krashna.app.models.PasswordResetTokenRepository
import nl.krashna.app.models.User
import nl.krashna.app.models.UserAuthority
import nl.krashna.app.models.UserRepository
import org.springframework.data.rest.webmvc.ResourceNotFoundException
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import java.util.Calendar
import java.util.Date
import java.util.Properties
import java.util.UUID

@RestController
@RequestMapping("/api/auth")
class PasswordController(
    private val userRepository: UserRepository,
    private val passwordResetTokenRepository: PasswordResetTokenRepository,
    private val bCryptPasswordEncoder: BCryptPasswordEncoder
) {
    @PostMapping("/forgot-password")
    fun forgotPassword(@RequestParam email: String) {
        val user = userRepository.findByEmail(email) ?: throw ResourceNotFoundException()
        val configFile = javaClass.classLoader.getResourceAsStream("config.properties")
        val properties = Properties()
        properties.load(configFile)

        val configuration = Configuration()
            .domain(properties.getProperty("MAILGUN_DOMAIN"))
            .apiKey(properties.getProperty("MAILGUN_API_KEY"))
            .from(properties.getProperty("FROM_NAME"), properties.getProperty("FROM_EMAIL"))

        val tokenString = UUID.randomUUID().toString()

        val calendar = Calendar.getInstance()
        calendar.time = Date()
        calendar.add(Calendar.DATE, 1)
        val expiryDate = calendar.time
        val token = PasswordResetToken(0, tokenString, user, expiryDate)
        passwordResetTokenRepository.save(token)

        Mail.using(configuration)
            .to(email)
            .subject("[krashna] Password Reset Instructions")
            .text(
                """
                You are receiving this message because you (or someone else) have requested the reset of the password for your account.

                Please click on the following link, or paste this into your browser to complete the process within 24 hours of receiving it:

                ${properties.getProperty("BASE_URL") + "/reset-password?token=" + tokenString}

                If you did not request this, please ignore this email and your password will remain unchanged.
            """.trimIndent()
            )
            .build()
            .send()
    }

    @GetMapping("/verify-password-reset-token")
    fun resetPassword(@RequestParam token: String) {
        verifyToken(token)
    }

    @PostMapping("/update-password-after-reset")
    fun updatePasswordAfterReset(@RequestBody request: PasswordResetRequest) {
        val resetToken = verifyToken(request.token)
        val user = resetToken.user
        user.password = bCryptPasswordEncoder.encode(request.password)
        userRepository.save(user)
        passwordResetTokenRepository.delete(resetToken)
    }

    private fun verifyToken(token: String): PasswordResetToken {
        val passwordResetToken = passwordResetTokenRepository.findByToken(token) ?: throw InvalidTokenException()
        if (passwordResetToken.isExpired()) throw InvalidTokenException()
        return passwordResetToken
    }
}

data class PasswordResetRequest(
    val token: String,
    val password: String
)
