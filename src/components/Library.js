import React from 'react';
import LibrarySong from './LibrarySong';

const Library = ({ songs, setCurrentSong, audioRef, isPlaying, setSongs, libraryStatus, currentSong }) => {
	return (
		<div className={`library ${libraryStatus ? 'active-library' : ''}`}>
			<h2>Library</h2>
			<div className='library-songs'>
				{songs.map((song) => (
					<LibrarySong
						song={song}
						songs={songs}
						setCurrentSong={setCurrentSong}
						id={song.id}
						key={song.id}
						audioRef={audioRef}
						isPlaying={isPlaying}
						setSongs={setSongs}
						currentSong={currentSong}
					/>
				))}
			</div>
		</div>
	);
};

export default Library;
