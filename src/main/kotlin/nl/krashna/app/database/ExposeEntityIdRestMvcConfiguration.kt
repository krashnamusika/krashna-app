package nl.krashna.app.database

import nl.krashna.app.models.Concert
import nl.krashna.app.models.Movement
import nl.krashna.app.models.Piece
import nl.krashna.app.models.Rehearsal
import nl.krashna.app.models.RehearsalPart
import nl.krashna.app.models.User
import nl.krashna.app.models.UserAuthority
import org.springframework.data.rest.core.config.RepositoryRestConfiguration
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer
import org.springframework.stereotype.Component

@Component
class ExposeEntityIdRestMvcConfiguration : RepositoryRestConfigurer {
    override fun configureRepositoryRestConfiguration(config: RepositoryRestConfiguration) {
        config.exposeIdsFor(Concert::class.java)
        config.exposeIdsFor(Movement::class.java)
        config.exposeIdsFor(Piece::class.java)
        config.exposeIdsFor(Rehearsal::class.java)
        config.exposeIdsFor(RehearsalPart::class.java)
        config.exposeIdsFor(UserAuthority::class.java)
        config.exposeIdsFor(User::class.java)
    }
}
