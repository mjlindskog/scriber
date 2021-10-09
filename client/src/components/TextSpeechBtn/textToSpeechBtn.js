import React from 'react';
import { Button, ButtonGroup } from '@chakra-ui/react';
import { textToSpeech } from '../../utils/API'

const testTitle = 'lorem'
const testMessage = 'lorem ipsum'

const textToSpeechBtn =  () => {


    const handleButtonSubmit = async (event) => {
        event.preventDefault();

        const testContent = [testTitle, testMessage];


        textToSpeech(testContent);

        
    };

    return (
        <div>
            <Button 
                isLoading 
                loadingText="Playing" 
                colorScheme="blackAlpha" 
                onClick={handleButtonSubmit}>
                Text to Speech
            </Button>
        </div>
    )

};

export default textToSpeechBtn;