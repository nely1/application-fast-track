import React from 'react'

const tablepage = () => {
  return (
    <table>
    <thead>
      <tr>
        <th>No.</th>
        <th>Job posting</th>
        <th>Number of applications</th>
      </tr>
    </thead>
    <tbody>
      <tr className="hover:bg-gray-100">
        <td><button  className="w-full text-left">1</button></td>
        <td><button  className="w-full text-left">Software engineer position for NES web platform</button></td>
        <td><button className="w-full text-left">101</button></td>
      </tr>

      <tr className="hover:bg-gray-100">
        <td><button  className="w-full text-left">2</button></td>
        <td><button  className="w-full text-left">Project Manager position for NES web platform</button></td>
        <td><button className="w-full text-left">200</button></td>
      </tr>
      
      <tr className="hover:bg-gray-100">
        <td><button  className="w-full text-left">3</button></td>
        <td><button  className="w-full text-left">Intern position for NES web platform</button></td>
        <td><button className="w-full text-left">10000</button></td>
      </tr>
    </tbody>
  </table>
  )
}

export default tablepage
