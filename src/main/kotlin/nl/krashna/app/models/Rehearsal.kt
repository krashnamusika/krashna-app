package nl.krashna.app.models

import java.util.Date
import javax.persistence.CascadeType
import javax.persistence.Column
import javax.persistence.ElementCollection
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id
import javax.persistence.OneToMany
import javax.persistence.Temporal
import javax.persistence.TemporalType

@Entity
data class Rehearsal(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long,

    @Column(nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    val startDateTime: Date,

    @Column(nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    val endDateTime: Date,

    @Column(nullable = false)
    val comment: String,

    @Column(nullable = false)
    val isOpen: Boolean,

    @Column(nullable = false)
    val isGeneral: Boolean,

    @Column(nullable = false)
    val isDress: Boolean,

    @Column(nullable = false)
    val isRehearsalDay: Boolean,

    @Column(nullable = false)
    val isInConcertClothing: Boolean,

    @Column
    @OneToMany(cascade = [CascadeType.ALL], orphanRemoval = true)
    val parts: List<RehearsalPart>
)
