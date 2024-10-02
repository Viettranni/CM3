import React from 'react'

export default function MembershipStatus({ status, onStatusChange }) {
  
    const handleStatusChange = (e) => {
    onStatusChange(e.target.checked ? 'Member' : 'Not a Member');
  }

  return (
    <div>
      <label htmlFor="membership" className="block text-gray-700 font-bold mb-2">
        Membership Status:
      </label>
      <div className="flex items-center">
        <input
          id="membership"
          type="checkbox"
          className="mr-2"
          checked={status === 'Member'}
          onChange={handleStatusChange}
        />
        <span>Active Member</span>
      </div>
      {/* <p className="mt-2">Current Status: {status}</p> */}
    </div>
  )
}