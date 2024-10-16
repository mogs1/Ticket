import { useSelector } from "react-redux"

function NoteItems({note}) {
	const {users} = useSelector((state) => state.auth)
  return (
	<div className="note" style={{
		backgroundColor: note.isStaff ? 'rgba(0,0,0,0.7)' : '#fff',
		color: note.isStaff ? '#fff' : '#000'
	}}>
		<h4>
			Note from {note.isStaff ? <span>Staff</span> : <span>{users.name}</span>}
		</h4>
		<p>{note.text}</p>
		<div className="note-date">
			{new Date(note.createdAt).toLocaleString('en-US')}
		</div>
	</div>
  )
}

export default NoteItems