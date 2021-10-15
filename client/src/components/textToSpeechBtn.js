import React, {useState} from 'react';
import { Button } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp'

import { useSpeechSynthesis } from 'react-speech-kit';



const TextToSpeechBtn =  () => {

    // const [value, setValue] = useState('');
    // const { speak } = useSpeechSynthesis();

    // const handleButtonSubmit = async (event) => {
    //     event.preventDefault();



        
    // };

    // return (

    //     <div>
    //         <textarea
    //             value={value}
    //             onChange={(event) => setValue(event.target.value)}
    //         />
    //         <Button 
    //             color="secondary" 
    //             variant="contained"
    //             onClick={() => speak({ text: value })}
    //             startIcon={<VolumeUpIcon />}>
    //             Read It Back
    //         </Button>
    //     </div>
    // )

};

export default TextToSpeechBtn;