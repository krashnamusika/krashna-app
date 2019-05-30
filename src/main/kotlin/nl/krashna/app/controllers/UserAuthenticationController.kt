package nl.krashna.app.controllers

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
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/auth")
class UserAuthenticationController(
    private val userRepository: UserRepository,
    private val bCryptPasswordEncoder: BCryptPasswordEncoder
) {
    @PostMapping("/register")
    fun signUp(@RequestBody user: User) {
        if (userRepository.findByEmail(user.email) != null) {
            throw DuplicateResourceException()
        }

        user.password = bCryptPasswordEncoder.encode(user.password)
        user.authorities = listOf(UserAuthority("USER"))
        userRepository.save(user)
    }

    @GetMapping("/current-user")
    fun currentUser(): User {
        val email = SecurityContextHolder.getContext().authentication.principal as String
        return userRepository.findByEmail(email) ?: throw ResourceNotFoundException()
    }

    @PostMapping("/update-password")
    fun updatePassword(@RequestBody request: PasswordUpdateRequest) {
        val email = SecurityContextHolder.getContext().authentication.principal as String
        val user = userRepository.findByEmail(email) ?: throw ResourceNotFoundException()
        user.password = bCryptPasswordEncoder.encode(request.password)
        userRepository.save(user)
    }
}

data class PasswordUpdateRequest(val password: String)
