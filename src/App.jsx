import { useRef, useState } from 'react';
import musicData from "./musicData/data";
import styled from 'styled-components';
import Navbar from './components/Navbar';
import Song from './components/Song';
import Player from './components/Player';
import Library from './components/Library';

function App() {

  const audioRef = useRef(null);
  //State
  const [songs, setSongs] = useState(musicData());
  const [currentSong,setCurrentSong] = useState(songs[0]);
  const [libraryStatus,setLibraryStatus] = useState(false);
  const [isPlaying,setIsPlaying] = useState(false);
  const [songInfo,setSongInfo] = useState({
    currentTime: 0,
    duration: 0
  });


  const updateTimeHandler = (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({...songInfo,currentTime,duration});
  }

  const songEndHandler = async () => {
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    let nextSong = songs[(currentIndex + 1) % songs.length ];
    await setCurrentSong(nextSong);
    const newSongs = songs.map((song) => {
      if(song.id === nextSong.id) {
        return {
          ...song,
          active: true
        }
      }else{
        return {
          ...song,
          active: false
        }
      }
    })
    setSongs(newSongs);
    if(isPlaying) {
      audioRef.current.play();
    }
  }

  return (
    <Container libraryStatus = {libraryStatus}>
      <Navbar libraryStatus={libraryStatus} setLibraryStatus = {setLibraryStatus} />
      <Song currentSong={currentSong} />
      <Player
        currentSong={currentSong}
        setCurrentSong = {setCurrentSong}
        isPlaying ={isPlaying}
        setIsPlaying ={setIsPlaying}
        songInfo = {songInfo}
        setSongInfo = {setSongInfo}
        audioRef = {audioRef}
        songs = {songs}
        setSongs = {setSongs}
      />
      <Library
        songs = {songs}
        libraryStatus ={libraryStatus}
        setCurrentSong = {setCurrentSong}
        isPlaying = {isPlaying}
        audioRef = {audioRef}
        setSongs = {setSongs}
      />
      <audio
        src={currentSong.audio}
        onLoadedMetadata={updateTimeHandler}
        onTimeUpdate={updateTimeHandler}
        onEnded={songEndHandler}
        ref={audioRef}
      />
    </Container>
  )
}

const Container = styled.div`
  transition: all 0.5s ease;
  margin-left: ${(props) => props.libraryStatus ? "20rem" : "0"};
  @media screen and (max-width: 768px) {
    margin-left: 0;
  }
`

export default App
