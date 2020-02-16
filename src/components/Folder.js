import React, { useState } from 'react'

import { Button, Table, Modal, FormControl, InputGroup } from 'react-bootstrap'
import { IoMdTrash } from 'react-icons/io'
import { FaFolderPlus } from 'react-icons/fa'


const uuidv4 = require("uuid/v4")

export function Folders(props) {
	let folders = props.folders
	let setFolders = props.setFolders
	let bookmarks = props.bookmarks
	let setBookmarks = props.setBookmarks
	let currentFolderId = props.currentFolderId
	let setCurrentFolder = props.setCurrentFolder
	let colorScheme = props.colorScheme

	const _deleteFolder = (folder) => {

		const _delete_children = (childrenFolders, childrenBookmarks) => {
			let fls_to_delete = folders.filter(
				fl => childrenFolders.includes(fl.folderId)
			)

			let bks_to_delete = bookmarks.filter(
				bk => childrenBookmarks.includes(bk.bookmarkId)
			)

			bks_to_delete.forEach(bk => _deleteBookmark(bk))
			fls_to_delete.forEach(fl => _deleteFolder(fl))
		}

		_delete_children(folder.childrenFolders, folder.childrenBookmarks)

		folders = folders.filter(fl => fl !== folder)

		setBookmarks(bookmarks)
		setFolders(folders)
	}

	const _deleteBookmark = (bookmark) => {
		bookmarks = bookmarks.filter(bk => bk !== bookmark)
	}

	return (
		<Table borderless size="sm">
			<tbody>
				{folders.filter(folder => folder.parentFolderId === currentFolderId).map(
					(folder, key) => (
						<tr key={key}>
							<td className="align-middle">
								<Button
									size="sm"
									style={colorScheme.folderBtns}
									onClick={() => setCurrentFolder(folder)}
								><span className="limited-text-btn">{folder.name}</span>
								</Button>
							</td>
							<td className="align-middle">
								<Button
									size="sm"
									className="shadow-none"
									style={colorScheme.trashBtns}
									onClick={() => _deleteFolder(folder)}
								><IoMdTrash/></Button>
							</td>
						</tr>
					)
				)}
			</tbody>
		</Table>
	)
}


export function AddFolderModal(props) {
	let folders = props.folders
	let setFolders = props.setFolders
	let currentFolderId = props.currentFolderId
	let colorScheme = props.colorScheme

	const [show, setShow] = useState(false)
	const textInput = React.createRef()

	const _handleClose = () => setShow(false)

	const _handleShow = () => setShow(true)

	const _addFolder = () => {
		if (textInput.current.value === '') {
			return
		}

		let new_folder = {
			name: textInput.current.value,
			folderId: uuidv4(),
			parentFolderId: currentFolderId,
			childrenFolders: [],
			childrenBookmarks: [],
		}

		folders.push(new_folder)

		textInput.current.value = ''

		// Add folder to the childrenFolders of the current folder
		if (currentFolderId !== null) {
			let parent_folder = folders.filter(fl => {
				return fl.folderId === currentFolderId
			})[0]

			parent_folder.childrenFolders.push(new_folder.folderId)
		}

		setFolders(folders)
		_handleClose()
	}

	return (
		<div>
			<Button
				className="shadow-none"
				style={colorScheme.navbarBtns}
				size="sm"
				onClick={_handleShow}
			><FaFolderPlus/></Button>

			<Modal show={show} onHide={_handleClose} animation={false}>
				<Modal.Body>
					<InputGroup>
						<FormControl
							size="sm"
							ref={textInput}
							aria-describedby="basic-addon2"
							placeholder="Folder name"
							autoFocus
						/>
						<InputGroup.Append>
							<Button
								style={colorScheme.navbarBtns}
								size="sm"
								className="shadow-none"
								onClick={_addFolder}
							>Add</Button>
						</InputGroup.Append>
					</InputGroup>
				</Modal.Body>
			</Modal>
		</div>
	)
}
