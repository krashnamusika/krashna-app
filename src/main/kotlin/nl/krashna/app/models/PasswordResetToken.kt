package nl.krashna.app.models

import java.util.Date
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.FetchType
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id
import javax.persistence.JoinColumn
import javax.persistence.OneToOne

@Entity
data class PasswordResetToken(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Int,

    @Column(unique = true)
    val token: String,

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(nullable = false)
    val user: User,

    @Column(nullable = false)
    val expiryDate: Date
) {
    fun isExpired() = Date().after(expiryDate)
}
