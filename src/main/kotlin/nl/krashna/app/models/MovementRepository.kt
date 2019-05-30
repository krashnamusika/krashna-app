package nl.krashna.app.models

import org.springframework.data.repository.CrudRepository
import org.springframework.security.access.prepost.PreAuthorize

interface MovementRepository : CrudRepository<Movement, Long> {
    @PreAuthorize("hasAuthority('SCHEDULER')")
    override fun <S : Movement?> save(entity: S): S

    @PreAuthorize("hasAuthority('SCHEDULER')")
    override fun deleteById(id: Long)

    @PreAuthorize("hasAuthority('SCHEDULER')")
    override fun deleteAll(entities: MutableIterable<Movement>)

    @PreAuthorize("hasAuthority('SCHEDULER')")
    override fun deleteAll()

    @PreAuthorize("hasAuthority('SCHEDULER')")
    override fun <S : Movement?> saveAll(entities: MutableIterable<S>): MutableIterable<S>

    @PreAuthorize("hasAuthority('SCHEDULER')")
    override fun delete(entity: Movement)
}
