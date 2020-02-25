import React, { useState } from 'react'

import {
	Button, Col, Container, FormControl, InputGroup, Modal, Row, Table
} from 'react-bootstrap'
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
		if (folder.parentFolderId !== null) {
			let parentFolder = folders.filter(
				fl => fl !== folder.parentFolderId
			)[0]

			parentFolder.childrenFolders = parentFolder.childrenFolders.filter(
				fl => fl !== folder.folderId
			)
		}

		const _deleteChildren = (childrenFolders, childrenBookmarks) => {
			let flsToDelete = folders.filter(
				fl => childrenFolders.includes(fl.folderId)
			)

			let bksToDelete = bookmarks.filter(
				bk => childrenBookmarks.includes(bk.bookmarkId)
			)

			bksToDelete.forEach(bk => _deleteBookmark(bk))
			flsToDelete.forEach(fl => _deleteFolder(fl))
		}

		_deleteChildren(folder.childrenFolders, folder.childrenBookmarks)

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
									className="folder-btn"
									onClick={() => setCurrentFolder(folder)}
								><span className="limited-text-btn">{folder.name}</span>
								</Button>
							</td>
							<td className="align-middle">
								<DeleteFolderModal folder={folder} deleteFolder={_deleteFolder} colorScheme={colorScheme}/>
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

		let newFolder = {
			name: textInput.current.value,
			folderId: uuidv4(),
			parentFolderId: currentFolderId,
			childrenFolders: [],
			childrenBookmarks: [],
		}

		folders.push(newFolder)

		textInput.current.value = ''

		// Add folder to the childrenFolders of the current folder
		if (currentFolderId !== null) {
			let parentFolder = folders.filter(fl => {
				return fl.folderId === currentFolderId
			})[0]

			parentFolder.childrenFolders.push(newFolder.folderId)
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


export function DeleteFolderModal(props) {
	let folder = props.folder
	let deleteFolder = props.deleteFolder
	let colorScheme = props.colorScheme

	const [show, setShow] = useState(false)

	const _handleClose = () => setShow(false)

	const _handleShow = () => setShow(true)

	const _deleteFolder = (folder) => {
		deleteFolder(folder)
		_handleClose()
	}

	return (
		<div>
			<Button
				className="shadow-none"
				style={colorScheme.trashBtns}
				size="sm"
				onClick={_handleShow}
			><IoMdTrash/></Button>

			<Modal size="sm" show={show} onHide={_handleClose} animation={false} closeButton>
				<Modal.Header closeButton>
					<Modal.Title>Are you sure?</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Container>
						<Row>
							<Col xs={6}>
								<span><b>Delete folder:</b></span>
							</Col>
							<Col xs={6}>
								<span><b className="limited-text">{folder.name}</b></span>
							</Col>
						</Row>
					</Container>
				</Modal.Body>
				<Modal.Footer>
					<Button
						style={colorScheme.navbarBtns}
						size="sm"
						className="shadow-none"
						onClick={() => _deleteFolder(folder)}
					>Yes, delete it!</Button>
				</Modal.Footer>
			</Modal>
		</div>
	)
}
