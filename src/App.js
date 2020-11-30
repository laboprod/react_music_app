import React, { useState, useRef } from 'react';
import './styles/app.scss';

import Player from './components/Player';
import Song from './components/Song';
import Library from './components/Library';
import Nav from './components/Nav';

import data from './data';

function App() {
	const audioRef = useRef(null);

	const [songs, setSongs] = useState(data());
	const [currentSong, setCurrentSong] = useState(songs[0]);
	const [isPlaying, setIsPlaying] = useState(false);
	const [songInfo, setSongInfo] = useState({
		currentTime: 0,
		duration: 0,
	});
	const [libraryStatus, setLibraryStatus] = useState(false);

	const timeUpdateHandler = (e) => {
		const current = e.target.currentTime;
		const duration = e.target.duration;
		setSongInfo({ ...songInfo, currentTime: current, duration });
	};

	const songEndHandler = async () => {
		let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
		await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
		if (isPlaying) audioRef.current.play();
	};

	return (
		<div className='App'>
			<Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
			<Song currentSong={currentSong} />
			<Player
				audioRef={audioRef}
				isPlaying={isPlaying}
				setIsPlaying={setIsPlaying}
				currentSong={currentSong}
				setSongInfo={setSongInfo}
				songInfo={songInfo}
				songs={songs}
				setCurrentSong={setCurrentSong}
			/>
			<Library
				audioRef={audioRef}
				songs={songs}
				setCurrentSong={setCurrentSong}
				isPlaying={isPlaying}
				setSongs={setSongs}
				libraryStatus={libraryStatus}
				currentSong={currentSong}
			/>
			<audio
				onTimeUpdate={timeUpdateHandler}
				onLoadedMetadata={timeUpdateHandler}
				ref={audioRef}
				src={currentSong.audio}
				onEnded={songEndHandler}
			></audio>
		</div>
	);
}

export default App;
