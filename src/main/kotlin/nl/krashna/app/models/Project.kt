package nl.krashna.app.models

import org.hibernate.annotations.Fetch
import org.hibernate.annotations.FetchMode
import javax.persistence.CascadeType
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.FetchType
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id
import javax.persistence.JoinColumn
import javax.persistence.OneToMany

@Entity
data class Project(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Int,

    @Column(nullable = false)
    val title: String,

    @Column(nullable = false)
    val isActive: Boolean,

    @OneToMany
    @Fetch(value = FetchMode.SUBSELECT)
    @JoinColumn(nullable = false)
    val pieces: List<Piece>,

    @OneToMany
    @Fetch(value = FetchMode.SUBSELECT)
    @JoinColumn(nullable = false)
    val rehearsals: List<Rehearsal>,

    @OneToMany
    @Fetch(value = FetchMode.SUBSELECT)
    @JoinColumn(nullable = false)
    val concerts: List<Concert>
)
