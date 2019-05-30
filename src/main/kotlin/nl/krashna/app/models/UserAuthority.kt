package nl.krashna.app.models

import com.fasterxml.jackson.annotation.JsonIgnore
import org.springframework.security.core.GrantedAuthority
import javax.persistence.Column
import javax.persistence.ElementCollection
import javax.persistence.Entity
import javax.persistence.FetchType
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id

@Entity
data class UserAuthority(
    @Id
    @Column(nullable = false, unique = true)
    val id: String
): GrantedAuthority {
    @JsonIgnore
    override fun getAuthority(): String = id
}
