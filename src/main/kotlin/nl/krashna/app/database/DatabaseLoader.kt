package nl.krashna.app.database

import nl.krashna.app.models.User
import nl.krashna.app.models.UserAuthority
import nl.krashna.app.models.UserAuthorityRepository
import nl.krashna.app.models.UserRepository
import org.springframework.beans.factory.InitializingBean
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.stereotype.Service

@Service
class DatabaseLoader
constructor(
    private val userAuthorityRepository: UserAuthorityRepository,
    private val userRepository: UserRepository,
    private val bCryptPasswordEncoder: BCryptPasswordEncoder
) : InitializingBean {
    override fun afterPropertiesSet() {
        userAuthorityRepository.save(UserAuthority("USER"))
        userAuthorityRepository.save(UserAuthority("SCHEDULER"))
        userAuthorityRepository.save(UserAuthority("ADMIN"))
        userRepository.save(
            User(
                0, "Teddy", "TourCie", "user@krashna.nl",
                bCryptPasswordEncoder.encode("pass"),
                listOf(UserAuthority("USER"))
            )
        )
        userRepository.save(
            User(
                0, "Sjors", "WebCie", "admin@krashna.nl",
                bCryptPasswordEncoder.encode("pass"),
                listOf(UserAuthority("USER"), UserAuthority("SCHEDULER"), UserAuthority("ADMIN"))
            )
        )
    }
}
