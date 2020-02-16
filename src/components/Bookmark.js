/*global chrome*/
import React from 'react'

import { Button, Form, Table } from 'react-bootstrap'
import { IoMdBookmark, IoMdTrash } from 'react-icons/io'


const uuidv4 = require('uuid/v4')

export function AddBookmarkBtn(props) {
	let folders = props.folders
	let setFolders = props.setFolders
	let bookmarks = props.bookmarks
	let setBookmarks = props.setBookmarks
	let currentFolderId = props.currentFolderId
	let colorScheme = props.colorScheme

	const _addBookmark = (tabs) => {

		let new_bookmark = {
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

		bookmarks.push(new_bookmark)

		// Add bookmark to the childrenBookmarks of the current folder
		if (currentFolderId !== null) {
			let parent_folder = folders.filter(fl => {
				return fl.folderId === currentFolderId
			})[0]

			parent_folder.childrenBookmarks.push(new_bookmark.bookmarkId)
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
	let bookmarks = props.bookmarks
	let setBookmarks = props.setBookmarks
	let currentFolderId = props.currentFolderId
	let colorScheme = props.colorScheme

	const _deleteBookmark = (bookmark) => {
		bookmarks = bookmarks.filter(bk => bk !== bookmark)
		setBookmarks(bookmarks)
	}

	const _rename_bookmark = (bookmark, e) => {
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
								{key+1}
							</td>
							<td className="text-left align-middle" style={colorScheme.bookmarksTableTds}>
								<Form.Control
									plaintext style={colorScheme.bookmarkTitle}
									value={bookmark.name}
									onChange={(e) => _rename_bookmark(bookmark, e)}
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
