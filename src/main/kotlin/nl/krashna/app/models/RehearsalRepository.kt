package nl.krashna.app.models

import org.springframework.data.repository.CrudRepository
import org.springframework.security.access.prepost.PreAuthorize

interface RehearsalRepository : CrudRepository<Rehearsal, Long> {
    @PreAuthorize("hasAuthority('SCHEDULER')")
    override fun <S : Rehearsal?> save(entity: S): S

    @PreAuthorize("hasAuthority('SCHEDULER')")
    override fun deleteById(id: Long)

    @PreAuthorize("hasAuthority('SCHEDULER')")
    override fun deleteAll(entities: MutableIterable<Rehearsal>)

    @PreAuthorize("hasAuthority('SCHEDULER')")
    override fun deleteAll()

    @PreAuthorize("hasAuthority('SCHEDULER')")
    override fun <S : Rehearsal?> saveAll(entities: MutableIterable<S>): MutableIterable<S>

    @PreAuthorize("hasAuthority('SCHEDULER')")
    override fun delete(entity: Rehearsal)
}
