import styles from './styles/Home.module.css'
import PlayerList from '../components/PlayerList';
import { Link } from 'react-router-dom'
import React from 'react';

class Home extends React.Component {

    constructor() {
        super();
        this.state = null;
        this.updateTeam = this.updateTeam.bind(this);
    }

    updateTeam(updatedTeam) {
        this.setState({ teams: { team1: updatedTeam.id == this.state.teams.team1.id ? updatedTeam : this.state.teams.team1, team2: updatedTeam.id == this.state.teams.team2.id ? updatedTeam : this.state.teams.team2 } });
    }

    componentWillMount() {
        const load = JSON.parse(localStorage.getItem('state'));
        if (load != null) this.setState(load);
        else
            this.setState({
                teams: {
                    team1: {
                        id: 0,
                        name: 'Csapat 1',
                        players: [],
                    },
                    team2: {
                        id: 1,
                        name: 'Csapat 2',
                        players: [],
                    }
                },
                startTime: new Date(new Date().setMinutes(new Date().getMinutes() + 1, 0, 0)).getTime(),
                minutes: 100,
            });
    }

    componentDidUpdate() {
        localStorage.setItem('state', JSON.stringify(this.state));
    }

    render() {
        return (
            <>
                <header className={styles.header}>
                    Új pontszámláló beállítása
                </header>
                <main className={styles.main} >
                    <div className={styles.mainContainer} >
                        <div className={styles.row} >

                            <div className={styles.column}>
                                <input type='text' defaultValue={this.state.teams.team1.name} className={styles.teamNameTextbox} onChange={(e) => {
                                    this.setState({
                                        teams: {
                                            team1: {
                                                id: 0,
                                                name: e.target.value,
                                                players: this.state.teams.team1.players
                                            },
                                            team2: {
                                                id: 1,
                                                name: this.state.teams.team2.name,
                                                players: this.state.teams.team2.players
                                            }
                                        }
                                    });
                                }} />
                                <PlayerList team={this.state.teams.team1} update={this.updateTeam} />
                            </div>

                            <div className={styles.column}>
                                <input type='text' defaultValue={this.state.teams.team2.name} className={styles.teamNameTextbox} onChange={(e) => {
                                    this.setState({
                                        teams: {
                                            team1: {
                                                id: 0,
                                                name: this.state.teams.team1.name,
                                                players: this.state.teams.team1.players
                                            },
                                            team2: {
                                                id: 1,
                                                name: e.target.value,
                                                players: this.state.teams.team2.players
                                            }
                                        }
                                    });
                                }} />
                                <PlayerList team={this.state.teams.team2} update={this.updateTeam} />
                            </div>
                        </div>
                        <div className={styles.settingsContainer}>
                            <div className={styles.title}>Kezdés</div>
                            <input className={styles.input} type='datetime-local' id='startTime' defaultValue={new Date(this.state.startTime + 3600000).toISOString().slice(0, 16)} onChange={(e) => {
                                this.setState({ startTime: new Date(e.target.value).getTime() })
                            }} />
                            <div className={styles.title}>Játékpercek</div>
                            <input className={styles.input} type='number' id='minutes' defaultValue={this.state.minutes} onChange={(e) => this.setState({ minutes: parseInt(e.target.value) })} />
                        </div>
                        <div className={styles.row}>
                            <Link to='/scoreboard/' state={this.state}>

                                <button className={styles.button} >
                                    Indítás
                                </button>
                            </Link>
                        </div>
                    </div>
                </main>
            </>
        );
    }


}

export default Home;
