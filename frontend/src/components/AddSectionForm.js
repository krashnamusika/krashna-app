import FormControl from '@material-ui/core/FormControl/index'
import InputLabel from '@material-ui/core/InputLabel/index'
import MenuItem from '@material-ui/core/MenuItem/index'
import Select from '@material-ui/core/Select/index'
import withStyles from '@material-ui/core/styles/withStyles'
import React from 'react'

const sections = {
    Orchestra: {
        Strings: ['Violin 1', 'Violin 2', 'Viola', 'Cello', 'Double Bass'],
        Woodwinds: ['Flute', 'Oboe', 'Clarinet', 'Bassoon', 'Saxophone'],
        Brass: ['Trumpet', 'Horn', 'Trombone', 'Tuba'],
        Keyboards: ['Celesta', 'Piano', 'Harpsichord', 'Organ', 'Synthesizer'],
        Percussion: [
            'Timpani',
            'Pitched Percussion',
            'Unpitched Percussion',
            'Harp',
        ],
    },
    Choir: {
        Female: ['Soprano', 'Mezzo-Soprano', 'Alto'],
        Male: ['Tenor', 'Baritone', 'Bass'],
    },
}

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 200,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
})

class AddSectionForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            orchestraChoir: '',
            sectionGroup: '',
            section: '',
        }
    }

    handleChange = e => {
        if (
            e.target.name === 'orchestraChoir' &&
            e.target.value !== this.state[e.target.name]
        ) {
            this.setState({ sectionGroup: '' })
        }

        if (
            (e.target.name === 'orchestraChoir' ||
                e.target.name === 'sectionGroup') &&
            e.target.value !== this.state[e.target.name]
        ) {
            this.setState({ section: '' })
        }

        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    render() {
        const classes = this.props.classes
        return (
            <form className={classes.root} autoComplete="off">
                <FormControl className={classes.formControl}>
                    <InputLabel shrink htmlFor="orchestraChoir">
                        Orchestra or Choir
                    </InputLabel>
                    <Select
                        value={this.state.orchestraChoir}
                        onChange={this.handleChange}
                        name="orchestraChoir"
                        id="orchestraChoir"
                        className={classes.selectEmpty}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {Object.keys(sections).map(key => (
                            <MenuItem value={key} key={key}>
                                {key}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                {this.state.orchestraChoir !== '' && (
                    <FormControl
                        className={classes.formControl}
                        disabled={this.state.orchestraChoir === ''}
                    >
                        <InputLabel shrink htmlFor="sectionGroup">
                            Section Group
                        </InputLabel>
                        <Select
                            value={this.state.sectionGroup}
                            onChange={this.handleChange}
                            name="sectionGroup"
                            id="sectionGroup"
                            className={classes.selectEmpty}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {Object.keys(
                                sections[this.state.orchestraChoir]
                            ).map(key => (
                                <MenuItem value={key} key={key}>
                                    {key}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                )}
                {this.state.orchestraChoir !== '' &&
                    this.state.sectionGroup !== '' && (
                        <FormControl
                            className={classes.formControl}
                            disabled={
                                this.state.orchestraChoir === '' ||
                                this.state.sectionGroup === ''
                            }
                        >
                            <InputLabel shrink htmlFor="section">
                                Section
                            </InputLabel>
                            <Select
                                value={this.state.section}
                                onChange={this.handleChange}
                                name="section"
                                id="section"
                                className={classes.selectEmpty}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {sections[this.state.orchestraChoir][
                                    this.state.sectionGroup
                                ].map(key => (
                                    <MenuItem value={key} key={key}>
                                        {key}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    )}
            </form>
        )
    }
}

export default withStyles(styles)(AddSectionForm)
