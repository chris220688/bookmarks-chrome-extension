/*global chrome*/
import React from 'react'

import { Button, Table } from 'react-bootstrap'


const uuidv4 = require("uuid/v4")

export function Settings(props) {
	let toggleSettings = props.toggleSettings
	let toggleColorScheme = props.toggleColorScheme
	let colorScheme = props.colorScheme
	let importBookmarks = props.importBookmarks
	let exportBookmarks = props.exportBookmarks
	let folders = props.folders
	let setFolders = props.setFolders
	let bookmarks = props.bookmarks
	let setBookmarks = props.setBookmarks

	const _handleBookmark = (chromeBookmark, currentFolder) => {
		let parentFolderId
		if (currentFolder === null) {
			parentFolderId = null
		} else {
			parentFolderId = currentFolder.folderId
		}

		let newBookmarkId = uuidv4()

		let newBookmark = {
			name: chromeBookmark.title,
			bookmarkId: newBookmarkId,
			parentFolderId: parentFolderId,
			url: chromeBookmark.url,
		}

		if (currentFolder !== null) {
			let parentFolder = folders.filter(fl => {
				return fl.folderId === parentFolderId
			})[0]

			parentFolder.childrenBookmarks.push(newBookmark.bookmarkId)
		}

		let updatedBookmarks = bookmarks
		updatedBookmarks.push(newBookmark)

		setBookmarks(updatedBookmarks)
	}

	const _handleFolder = (chromeFolder, currentFolder) => {
		let parentFolderId
		if (currentFolder !== null) {
			parentFolderId = currentFolder.folderId
		} else {
			parentFolderId = null
		}

		let newFolderId = uuidv4()

		let newFolder = {
			name: chromeFolder.title,
			folderId: newFolderId,
			parentFolderId: parentFolderId,
			childrenFolders: [],
			childrenBookmarks: [],
		}

		if (currentFolder !== null) {
			let parentFolder = folders.filter(fl => {
				return fl.folderId === parentFolderId
			})[0]

			parentFolder.childrenFolders.push(newFolder.folderId)
		}

		let updatedFolders = folders
		updatedFolders.push(newFolder)

		setFolders(updatedFolders)
		_importChromeBookmarks(chromeFolder, newFolder)
	}

	const _importChromeBookmarks = (chromeFolder, currentFolder) => {
		let chromeParentId = null

		if (typeof chromeFolder === 'undefined') {
			chromeParentId = '1' // Root 'Bookmarks bar' id in chrome
		} else {
			chromeParentId = chromeFolder.id
		}

		if (typeof currentFolder === 'undefined') {
			currentFolder = null // Root folder in the extension
		}

		chrome.bookmarks.getChildren(chromeParentId, function(itemTree) {
			itemTree.forEach(function(item){
				if (typeof item.url !== 'undefined') {
					_handleBookmark(item, currentFolder)
				} else {
					_handleFolder(item, currentFolder)
				}
			})
		})
	}

	return (
		<section>
			<Table borderless size="sm">
				<tbody className="text-left">
					<tr>
						<td>
							<span style={colorScheme.settingsText}>Dark mode</span>
						</td>
						<td>
							<label className="switch">
								<input
									type="checkbox"
									checked={colorScheme.darkMode}
									onChange={(e) => toggleColorScheme(e)}
								/>
								<span className="slider round"></span>
							</label>
						</td>
					</tr>
					<tr>
						<td>
							<span style={colorScheme.settingsText}>Import from file</span>
						</td>
						<td>
							<input
								size="sm"
								className="shadow-none"
								style={colorScheme.navbarBtns}
								type="file"
								accept=".json"
								onChange={(e) => {
									importBookmarks(e.target.files[0]);
									toggleSettings()
								}}
							/>
						</td>
					</tr>
					<tr>
						<td>
							<span style={colorScheme.settingsText}>Import from chrome</span>
						</td>
						<td>
							<Button
								size="sm"
								className="shadow-none"
								style={colorScheme.navbarBtns}
								onClick={() => {
									_importChromeBookmarks();
									toggleSettings()
								}}
							>Import
							</Button>
						</td>
					</tr>
					<tr>
						<td>
							<span style={colorScheme.settingsText}>Export bookmarks</span>
						</td>
						<td>
							<Button
								size="sm"
								className="shadow-none"
								style={colorScheme.navbarBtns}
								onClick={() => exportBookmarks()}
							>Export
							</Button>
						</td>
					</tr>
				</tbody>
			</Table>
		</section>
	)
}
