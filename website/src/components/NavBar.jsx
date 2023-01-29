import Cut from './../images/Cut.png';
import Copy from './../images/Copy.png';
import People from '../images/People.png';
import Settings from '../images/Settings.png';
import GitHub from '../images/GitHub.png';

const NavBar = ({ usersCount, openNewSessionJoin, openSettings, copyAllText, cutAllText, roomId }) => {
    return (
        <nav
            className="navbar navbar-light"
            style={{
                minHeight: '4rem',
                top: '0',
                width: '100%',
                backgroundColor: 'black',
                position: 'fixed',
            }}
        >
            <span className="navbar-brand" style={{ fontSize: '1.5rem', color: 'white' }}>
                {document.title}
            </span>
            <a href="https://github.com/skrmain/LiveNotepad" target="_blank" title="GitHub" rel="noopener noreferrer">
                <img src={GitHub} alt="GitHub" />
            </a>
            <div className="nav-action-container">
                <button onClick={cutAllText} style={{ marginRight: '10px' }} title="Cut all text">
                    <img src={Cut} alt="Cut" style={{ width: '25px', height: '25px' }} />
                </button>
                <button onClick={copyAllText} style={{ marginRight: '10px' }} title="Copy all text">
                    <img src={Copy} alt="Copy" style={{ width: '25px', height: '25px' }} />
                </button>
                <button onClick={openNewSessionJoin} style={{ marginRight: '10px' }} title="People">
                    <img src={People} alt="People" />
                    <span className="usersCount">{usersCount}</span>({roomId})
                </button>
                <button style={{ marginRight: '10px' }} onClick={openSettings} title="settings">
                    <img src={Settings} alt="Settings" />
                </button>
            </div>
        </nav>
    );
};

export default NavBar;
