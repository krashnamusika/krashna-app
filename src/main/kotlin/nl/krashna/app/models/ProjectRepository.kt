package nl.krashna.app.models

import org.springframework.data.repository.CrudRepository
import org.springframework.security.access.prepost.PreAuthorize

interface ProjectRepository : CrudRepository<Project, Long> {
    @PreAuthorize("hasAuthority('SCHEDULER')")
    override fun <S : Project?> save(entity: S): S

    @PreAuthorize("hasAuthority('SCHEDULER')")
    override fun deleteById(id: Long)

    @PreAuthorize("hasAuthority('SCHEDULER')")
    override fun deleteAll(entities: MutableIterable<Project>)

    @PreAuthorize("hasAuthority('SCHEDULER')")
    override fun deleteAll()

    @PreAuthorize("hasAuthority('SCHEDULER')")
    override fun <S : Project?> saveAll(entities: MutableIterable<S>): MutableIterable<S>

    @PreAuthorize("hasAuthority('SCHEDULER')")
    override fun delete(entity: Project)
}
