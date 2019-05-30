package nl.krashna.app.models

import org.springframework.data.repository.CrudRepository
import org.springframework.security.access.prepost.PreAuthorize

interface ConcertRepository : CrudRepository<Concert, Long> {
    @PreAuthorize("hasAuthority('SCHEDULER')")
    override fun <S : Concert?> save(entity: S): S

    @PreAuthorize("hasAuthority('SCHEDULER')")
    override fun deleteById(id: Long)

    @PreAuthorize("hasAuthority('SCHEDULER')")
    override fun deleteAll(entities: MutableIterable<Concert>)

    @PreAuthorize("hasAuthority('SCHEDULER')")
    override fun deleteAll()

    @PreAuthorize("hasAuthority('SCHEDULER')")
    override fun <S : Concert?> saveAll(entities: MutableIterable<S>): MutableIterable<S>

    @PreAuthorize("hasAuthority('SCHEDULER')")
    override fun delete(entity: Concert)
}
