/*global chrome*/
import React, { useState } from 'react'

import {
	Button, Col, Container, Dropdown, DropdownButton, Form, Modal, Row, Table
} from 'react-bootstrap'
import { IoMdBookmark, IoMdTrash, IoMdMove } from 'react-icons/io'


const uuidv4 = require('uuid/v4')

export function AddBookmarkBtn(props) {
	let folders = props.folders
	let setFolders = props.setFolders
	let bookmarks = props.bookmarks
	let setBookmarks = props.setBookmarks
	let currentFolderId = props.currentFolderId
	let colorScheme = props.colorScheme

	const _addBookmark = (tabs) => {

		let newBookmark = {
			name: tabs.title,
			bookmarkId: uuidv4(),
			parentFolderId: currentFolderId,
			url: tabs.url,
		}

		// If the bookmark exists in the current folder do not duplicate it
		if (bookmarks.some(
				bookmarks => bookmarks.url === tabs.url && bookmarks.parentFolderId === currentFolderId
		)) {
			return
		}

		bookmarks.push(newBookmark)

		// Add bookmark to the childrenBookmarks of the current folder
		if (currentFolderId !== null) {
			let parentFolder = folders.filter(fl => {
				return fl.folderId === currentFolderId
			})[0]

			parentFolder.childrenBookmarks.push(newBookmark.bookmarkId)
		}

		setBookmarks(bookmarks)
		setFolders(folders)
	}

	return (
		<Button
			size="sm"
			className="shadow-none"
			style={colorScheme.navbarBtns}
			onClick={() => chrome.tabs.query(
				{ active: true, lastFocusedWindow: true },
				function (tabs) {
					_addBookmark(tabs[0])
				}
			)}
		><IoMdBookmark/>
		</Button>
	)
}


export function Bookmarks(props) {
	let folders = props.folders
	let setFolders = props.setFolders
	let bookmarks = props.bookmarks
	let setBookmarks = props.setBookmarks
	let moveBookmark = props.moveBookmark
	let currentFolderId = props.currentFolderId
	let colorScheme = props.colorScheme

	const _deleteBookmark = (bookmark) => {
		// Clear bookmark from the children of the current folder
		if (bookmark.parentFolderId !== null) {
			let currentFolder = folders.filter(
				fl => fl.folderId === bookmark.parentFolderId
			)[0]

			currentFolder.childrenBookmarks = currentFolder.childrenBookmarks.filter(
				bk => bk !== bookmark.bookmarkId
			)
		}

		// Clear the bookmark from the bookmarks list
		bookmarks = bookmarks.filter(bk => bk !== bookmark)

		setBookmarks(bookmarks)
		setFolders(folders)
	}

	const _renameBookmark = (bookmark, e) => {
		bookmark.name = e.target.value
		setBookmarks(bookmarks)
	}

	return (
		<Table striped bordered hover size="sm" style={colorScheme.bookmarksTable}>
			<tbody>
				{bookmarks.filter(bookmark => bookmark.parentFolderId === currentFolderId).map(
					(bookmark, key) => (
						<tr key={key}>
							<td className="align-middle" style={colorScheme.bookmarksTableTds}>
								<img alt="" src={"chrome://favicon/" + bookmark.url}/>
							</td>
							<td className="text-left align-middle" style={colorScheme.bookmarksTableTds}>
								<Form.Control
									plaintext style={colorScheme.bookmarkTitle}
									value={bookmark.name}
									onChange={(e) => _renameBookmark(bookmark, e)}
								/>
							</td>
							<td className="text-left align-middle" style={colorScheme.bookmarksTableTds}>
								<a
									className="limited-text"
									style={colorScheme.bookmarkLink}
									href={bookmark.url}
									target="_blank"
									rel="noopener noreferrer">{bookmark.url}
								</a>
							</td>
							<td className="align-middle" style={colorScheme.bookmarksTableTds}>
								<MoveBookmarkModal
									folders={folders}
									bookmark={bookmark}
									moveBookmark={moveBookmark}
									colorScheme={colorScheme}
								/>
							</td>
							<td className="align-middle" style={colorScheme.bookmarksTableTds}>
								<Button
									size="sm"
									className="shadow-none"
									style={colorScheme.trashBtns}
									onClick={() => _deleteBookmark(bookmark)}
								><IoMdTrash/>
								</Button>
							</td>
						</tr>
					)
				)}
			</tbody>
		</Table>
	)
}

export function MoveBookmarkModal(props) {
	let folders = props.folders
	let bookmark = props.bookmark
	let moveBookmark = props.moveBookmark
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

	const _moveBookmark = (folder) => {
		moveBookmark(bookmark, folder)
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
			><IoMdMove/>
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
						onClick={() => _moveBookmark(destFolder)}
					>Move!</Button>
				</Modal.Footer>
			</Modal>
		</div>
	)
}
