package nl.krashna.app.models

import org.springframework.data.repository.CrudRepository
import org.springframework.security.access.prepost.PreAuthorize

interface PieceRepository : CrudRepository<Piece, Long> {
    @PreAuthorize("hasAuthority('SCHEDULER')")
    override fun <S : Piece?> save(entity: S): S

    @PreAuthorize("hasAuthority('SCHEDULER')")
    override fun deleteById(id: Long)

    @PreAuthorize("hasAuthority('SCHEDULER')")
    override fun deleteAll(entities: MutableIterable<Piece>)

    @PreAuthorize("hasAuthority('SCHEDULER')")
    override fun deleteAll()

    @PreAuthorize("hasAuthority('SCHEDULER')")
    override fun <S : Piece?> saveAll(entities: MutableIterable<S>): MutableIterable<S>

    @PreAuthorize("hasAuthority('SCHEDULER')")
    override fun delete(entity: Piece)
}
