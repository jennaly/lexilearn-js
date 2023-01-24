import React from 'react';
import { useFavoriteWordsContext } from '../hooks/useFavoriteWordsContext';

const DownloadButtons = () => {

    const { favoriteWords } = useFavoriteWordsContext();

    const todayDate = new Date().toISOString().slice(0, 10);

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

    const exportToStudySetCsv = e => {
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
          fileName: `${todayDate}-StudySet.csv`,
          fileType: 'text/csv',
        })
    }

    const exportToReportCsv = e => {
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
          fileName: `${todayDate}-TeacherReport.csv`,
          fileType: 'text/csv',
        })
    }

    return (
        <div className="flex max-w-sm lg:max-w-xl mx-auto justify-center gap-5 m-5 text-sm lg:text-base">
            <button 
            type='button' 
            onClick={exportToStudySetCsv}
            className="rounded-none lg:rounded-full outline outline-1 bg-yellow-700 outline-yellow-700 hover:border hover:border-yellow-800 hover:bg-yellow-800 font-fredoka-one text-base-100 uppercase"
            >
                Download Study Set
            </button>

            <button 
            type='button' 
            onClick={exportToReportCsv}
            className="rounded-none lg:rounded-full outline outline-1 outline-yellow-700 hover:border hover:border-yellow-700 text-yellow-700 font-fredoka-one uppercase"
            >
                Download Teacher's Report
            </button>
        </div>
    )
}

export default DownloadButtons
