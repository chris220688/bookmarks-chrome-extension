import React, { useState } from 'react'

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import {
	Button, Col, Container, Dropdown, DropdownButton, FormControl, InputGroup, Modal, Row, Table
} from 'react-bootstrap'
import { IoMdMove, IoMdTrash} from 'react-icons/io'
import { FaFolderPlus } from 'react-icons/fa'
import { GoFileSymlinkDirectory } from 'react-icons/go'


const uuidv4 = require("uuid/v4")

export function Folders(props) {
	let folders = props.folders
	let setFolders = props.setFolders
	let bookmarks = props.bookmarks
	let setBookmarks = props.setBookmarks
	let moveFolder = props.moveFolder
	let currentFolderId = props.currentFolderId
	let childrenFolders = props.childrenFolders
	let setCurrentFolder = props.setCurrentFolder
	let colorScheme = props.colorScheme

	const _deleteFolder = (folder) => {
		if (folder.parentFolderId !== null) {
			let parentFolder = folders.filter(
				fl => fl.folderId === folder.parentFolderId
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

	const _onDragEnd = (result) => {
		if (!result.destination) {
			return
		}

		let currentFolderList = folders.filter(fl => fl.folderId === currentFolderId)

		if (currentFolderList.length > 0) {
			let currentFolder = currentFolderList[0]
			currentFolder.childrenFolders.splice(
				result.source.index, 1
			)
			currentFolder.childrenFolders.splice(
				result.destination.index, 0, result.draggableId
			)
		} else {
			let rootFolders = folders.filter(fl => fl.parentFolderId === null)
			let replaceableFolder = rootFolders[result.destination.index]
			let replaceableFolderIndex = folders.indexOf(replaceableFolder)
			let folderToMove = rootFolders[result.source.index]
			let folderToMoveIndex = folders.indexOf(folderToMove)
			// Remove folder from its original position
			folders.splice(
				folderToMoveIndex, 1
			)
			// Place folder on the new position
			folders.splice(
				replaceableFolderIndex, 0, folderToMove
			)
		}
		setFolders(folders)
	}

	return (
		<DragDropContext onDragEnd={_onDragEnd}>
			<Droppable droppableId="droppable">
				{(provided, snapshot) => (
					<Table borderless size="sm" ref={provided.innerRef}>
						<tbody>
							{childrenFolders.map((folder, index) => (
								<Draggable key={folder.folderId} draggableId={folder.folderId} index={index}>
									{(provided, snapshot) => (
										<tr ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
											<td className="align-middle">
												<Button
													size="sm"
													style={colorScheme.folderBtns}
													className="folder-btn"
													onClick={() => setCurrentFolder(folder)}
												>
													<span className="limited-text-btn">{folder.name}</span>
												</Button>
											</td>
											<td className="align-middle" style={colorScheme.bookmarksTableTds}>
												<MoveFolderModal
													folders={folders}
													folder={folder}
													moveFolder={moveFolder}
													colorScheme={colorScheme}
												/>
											</td>
											<td className="align-middle">
												<DeleteFolderModal
													folder={folder}
													deleteFolder={_deleteFolder}
													colorScheme={colorScheme}
												/>
											</td>
											<td className="align-middle">
												<Button
													size="sm"
													style={colorScheme.reorderBtns}
													className="shadow-none"
												>
														<IoMdMove/>
												</Button>
											</td>
										</tr>
									)}
								</Draggable>
							))}
							{provided.placeholder}
						</tbody>
					</Table>
				)}
			</Droppable>
		</DragDropContext>
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


export function MoveFolderModal(props) {
	let folders = props.folders
	let folder = props.folder
	let moveFolder = props.moveFolder
	let colorScheme = props.colorScheme

	const [show, setShow] = useState(false)
	const [destFolder, setDestFolder] = useState(null)

	const _handleClose = () => setShow(false)

	const _handleShow = () => setShow(true)

	const _setDestFolder = (eventKey) => {
		let folder = folders.filter(fl => {
			return fl.folderId === eventKey
		})[0]

		setDestFolder(folder)
	}

	const _moveFolder = (destFolder) => {
		moveFolder(folder, destFolder)
		_handleClose()
	}

	const _dropdownValueName = (name) => {
		if (name.length > 12 ) {
			return name.substring(0, 12) + ".."
		}

		return name
	}

	return (
		<div>
			<Button
				size="sm"
				className="shadow-none"
				style={colorScheme.trashBtns}
				onClick={_handleShow}
			><GoFileSymlinkDirectory/>
			</Button>

			<Modal size="sm" show={show} onHide={_handleClose} animation={false}>
				<Modal.Body>
					<Container>
						<Row>
							<Col xs={6}>
								<span><b>Move to folder:</b></span>
							</Col>
							<Col xs={6}>
								<DropdownButton
									size="sm"
									id="dropdown-basic-button"
									title={destFolder !== null ? _dropdownValueName(destFolder.name) : "Root folder"}
									onSelect={(eventKey) => _setDestFolder(eventKey)}
									variant="secondary"
								>
									{folders.map(
										(folder, key) => (
											<Dropdown.Item
												key={key}
												eventKey={folder.folderId}
												className="limited-text">
													{folder.name}
											</Dropdown.Item>
										)
									)}
								</DropdownButton>
							</Col>
						</Row>
					</Container>
				</Modal.Body>
				<Modal.Footer>
					<Button
						style={colorScheme.navbarBtns}
						size="sm"
						className="shadow-none"
						onClick={() => _moveFolder(destFolder)}
					>Move!</Button>
				</Modal.Footer>
			</Modal>
		</div>
	)
}
