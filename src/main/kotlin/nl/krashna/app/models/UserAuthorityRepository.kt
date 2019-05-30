package nl.krashna.app.models

import org.springframework.data.repository.CrudRepository
import org.springframework.data.rest.core.annotation.RepositoryRestResource

@RepositoryRestResource(exported = false)
interface UserAuthorityRepository : CrudRepository<UserAuthority, Long>
