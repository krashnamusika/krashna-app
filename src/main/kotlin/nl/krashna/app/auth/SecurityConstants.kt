package nl.krashna.app.auth

object SecurityConstants {
    val SECRET = "SecretKeyToGenJWTs" // FIXME
    val EXPIRATION_TIME: Long = 864000000 // 10 days
    val TOKEN_PREFIX = "Bearer "
    val HEADER_STRING = "Authorization"
}
