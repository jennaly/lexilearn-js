import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useFavoriteWordsContext } from '../hooks/useFavoriteWordsContext';

const DownloadButtons = () => {
    const { user } = useAuthContext();
    const { favoriteWords } = useFavoriteWordsContext();
    
    const [name, setName] = useState('')
    const [showNameInput, setShowNameInput] = useState(false);  
    const todayDate = new Date().toISOString().slice(0, 10);

    useEffect(() => {
      if (user) {
        setName(user.name);
      } 
    }, [user])

    const handleClick = (e, cb) => {
      if (!name) {
        setShowNameInput(true);
      } else {
        const formattedName = formatName(name);
        cb(e, formattedName);
        setShowNameInput(false);
      }
    }

    const downloadFile = ({ data, fileName, fileType }) => {
        const blob = new Blob([data], { type: fileType })
      
        const a = document.createElement('a')
        a.download = fileName
        a.href = window.URL.createObjectURL(blob)
        const clickEvt = new MouseEvent('click', {
          view: window,
          bubbles: true,
          cancelable: true,
        })
        a.dispatchEvent(clickEvt)
        a.remove()
    }

    const formatName = (fullName) => {
      return fullName
              .split(" ")
              .map((word, index) => index == 0 ? word : word[0])
              .join("");
    }

    const exportToStudySetCsv = (e, formattedName) => {
        e.preventDefault()

        // Headers for each column
        let headers = ['Term', 'Definitions']
      
        // Convert users data to a csv
        let vocabWordsCsv = favoriteWords.reduce((acc, word) => {
          const { term, definitions } = word;
    
          // Escape commas in definition strings
          const newDefinitions = definitions.map(definition => `"${definition}"`)
    
          acc.push([term, newDefinitions.join(",")])
          return acc
        }, [])
      
        downloadFile({
          data:  [headers, ...vocabWordsCsv].join('\n'),
          fileName: `${todayDate}-StudySet-${formattedName}.csv`,
          fileType: 'text/csv',
        })
    }

    const exportToReportCsv = (e, formattedName) => {
        e.preventDefault()
      
        // Headers for each column
        let headers = ['Term', 'Difficulty']
      
        // Convert users data to a csv
        let vocabWordsCsv = favoriteWords.reduce((acc, word) => {
          const { term, difficulty } = word;
    
          acc.push([term, difficulty])
          return acc
        }, [])
      
        downloadFile({
          data:  [headers, ...vocabWordsCsv].join('\n'),
          fileName: `${todayDate}-Report-${formattedName}.csv`,
          fileType: 'text/csv',
        })
    }

    return (
      <>
        {showNameInput &&
          <div className="alert alert-warning shadow-lg">
            <div className="flex font-gaegu text-lg lg:text-xl">
              <label htmlFor="name" className="font-gaegu text-yellow-700 ">
                Please enter your name: 
                <input
                id="name"
                type="text"
                onChange={(e) => setName(e.target.value)}
                placeholder="Miles Morales"
                value={name}
                className="bg-transparent p-0.5 ml-1"
                />
              </label>
            </div>
          </div>
        }
        <div className="flex max-w-sm lg:max-w-xl mx-auto justify-center gap-5 m-5 text-sm lg:text-base">
            <button 
            type='button' 
            onClick={(e) => handleClick(e, exportToStudySetCsv)}
            className="rounded-none lg:rounded-full bg-yellow-700 hover:bg-yellow-800 hover:border-yellow-800 font-fredoka-one text-base-100 uppercase"
            >
                Download Study Set
            </button>

            <button 
            type='button' 
            onClick={(e) => handleClick(e, exportToReportCsv)}
            className="rounded-none lg:rounded-full border-2 border-yellow-700 hover:border-yellow-800  text-yellow-700 hover:text-yellow-800 font-fredoka-one uppercase"
            >
                Download Teacher's Report
            </button>
        </div>
      </>
    )
}

export default DownloadButtons
