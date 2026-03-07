import React from 'react'
import FaceExpression from '../../Expression/components/FaceExpression'
import { useSong } from '../hooks/useSong'
import Player from '../components/Player'

const Home = () => {

    const { handleGetSong } = useSong()

    return (
        <>
            <FaceExpression
                onClick={(expression) => { handleGetSong({ mood: expression }) }}
            />
            <Player />
        </>
    )
}

export default Home