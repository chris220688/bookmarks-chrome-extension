/*global chrome*/
import React, { Component } from 'react'
import '../styles/App.css'

import { Alert, Button, Nav, Navbar } from 'react-bootstrap'
import { IoIosArrowBack, IoIosSettings } from 'react-icons/io'
import localStorage from 'local-storage'

import { Bookmarks, AddBookmarkBtn} from './Bookmark.js'
import { CustomToast } from './CustomToast.js'
import { Folders, AddFolderModal } from './Folder.js'
import { Settings } from './Settings.js'
import { lightTheme, darkTheme, backgroundColor } from '../constants/Themes.js'
import validate from '../schema/validateSchema.js'


class App extends Component {

	state = {
		currentFolderId: null,
		currentFolderName: null,
		folders: [],
		bookmarks: [],
		settings: false,
		colorScheme: lightTheme,
		error: null,
	}

	componentDidMount() {
		let localState = localStorage.get('state')
		if (localState !== null && localState.length !== {}) {
			this.setState(localState)

			if (localState.colorScheme.darkMode) {
				document.body.style.background = backgroundColor
			}
		}
		this.setState(state => ({
			currentFolderId: null,
			currentFolderName: null,
		}))
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.foldlers !== this.state.folders ||
			prevState.bookmarks !== this.state.bookmarks ||
			prevState.colorScheme !== this.state.colorScheme
		) {
			localStorage.set('state', this.state)
		}
	}

	setError = (error) => {
		this.setState(state => ({
			error: error
		}))
	}

	setCurrentFolder = (folder) => {
		this.setState(state => ({
			currentFolderId: folder.folderId,
			currentFolderName: folder.name,
		}))
	}

	getTitle = () => {
		if (this.state.settings === true) {
			return <h6 style={this.state.colorScheme.folderTitle} className="limited-text">Settings</h6>
		}

		if (this.state.currentFolderName !== null) {
			return <h6 style={this.state.colorScheme.folderTitle} className="limited-text">{this.state.currentFolderName}</h6>
		}

		return <span></span>
	}

	getChildrenFolders = () => {
		let childrenFolders = []
		if (this.state.currentFolderId !== null) {
			let currentFolder = this.state.folders.filter(
				fl => fl.folderId === this.state.currentFolderId
			)[0]

			currentFolder.childrenFolders.forEach(folderId => childrenFolders.push(
				this.state.folders.filter(fl => fl.folderId === folderId)[0]
			))
		} else {
			childrenFolders = this.state.folders.filter(fl => fl.parentFolderId === this.state.currentFolderId)
		}

		return childrenFolders
	}

	setFolders = (folders) => {
		this.setState(state => ({
			folders: folders
		}))
	}

	moveFolder = (folder, destFolder) => {
		let folders = this.state.folders

		folder = folders.filter(fl => fl.folderId === folder.folderId)[0]

		if (folder.parentFolderId !== null) {
			// Remove folder from children list of parent folder
			let parentFolder = folders.filter(fl => fl.folderId === folder.parentFolderId)[0]
			parentFolder.childrenFolders = parentFolder.childrenFolders.filter(folderId => folderId !== folder.folderId)
		}

		if (destFolder !== null) {
			// Add folder to children list of the destination folder
			destFolder = folders.filter(fl => fl.folderId === destFolder.folderId)[0]
			destFolder.childrenFolders.push(folder.folderId)
			// Change parent folder to the destination one
			folder.parentFolderId = destFolder.folderId
		} else {
			folder.parentFolderId = null
		}

		this.setState(state => ({
			folders: folders
		}))
	}

	getChildrenBookmarks = () => {
		let childrenBookmarks = []
		if (this.state.currentFolderId !== null) {
			let currentFolder = this.state.folders.filter(
				fl => fl.folderId === this.state.currentFolderId
			)[0]

			currentFolder.childrenBookmarks.forEach(bookmarkId => childrenBookmarks.push(
				this.state.bookmarks.filter(bk => bk.bookmarkId === bookmarkId)[0]
			))
		} else {
			childrenBookmarks = this.state.bookmarks.filter(bk => bk.parentFolderId === this.state.currentFolderId)
		}

		return childrenBookmarks
	}

	setBookmarks = (bookmarks) => {
		this.setState(state => ({
			bookmarks: bookmarks
		}))
	}

	moveBookmark = (bookmark, folder) => {
		let folders = this.state.folders

		let currentFolderList = folders.filter(
			fl => fl.folderId === bookmark.parentFolderId
		)

		if (currentFolderList.length > 0) {
			// Remove bookmark id from the children of the current folder
			currentFolderList[0].childrenBookmarks = currentFolderList[0].childrenBookmarks.filter(
				bk => bk !== bookmark.bookmarkId
			)
		}

		if (folder !== null) {
			// Append bookmark id to the children of the new folder
			let newFolder = folders.filter(
				fl => fl.folderId === folder.folderId
			)[0]

			newFolder.childrenBookmarks.push(bookmark.bookmarkId)
		}

		this.setState(state => ({
			folders: folders
		}))

		// Update bookmark's new parent folder
		if (folder !== null) {
			bookmark.parentFolderId = folder.folderId
		} else {
			bookmark.parentFolderId = null
		}

		let bookmarks = this.state.bookmarks.filter(
			bk => bk.bookmarkId !== bookmark.bookmarkId
		)
		bookmarks.push(bookmark)

		this.setState(state => ({
			bookmarks: bookmarks
		}))
	}

	goBack = () => {
		if (this.state.settings === true) {
			this.setState(state => ({
				settings: false,
			}))
			return
		}

		let filteredFolders = this.state.folders.filter(fl => {
			return fl.folderId === this.state.currentFolderId
		})

		let parentFolder = this.state.folders.filter(fl => {
			return fl.folderId === filteredFolders[0].parentFolderId
		})

		if (parentFolder.length > 0) {
			this.setState(state => ({
				currentFolderId: parentFolder[0].folderId,
				currentFolderName: parentFolder[0].name,
			}))
		} else {
			this.setState(state => ({
				currentFolderId: null,
				currentFolderName: null,
			}))
		}
	}

	toggleSettings = () => {
		this.setState(state => ({
			settings: !this.state.settings
		}))
	}

	toggleColorScheme = (e) => {
		if (this.state.colorScheme.darkMode === false) {
			this.setState(state => ({
				colorScheme: darkTheme
			}))
			document.body.style.background = backgroundColor
		} else {
			this.setState(state => ({
				colorScheme: lightTheme
			}))
			document.body.style.background = null
		}
	}

	importBookmarks = (file) => {
		let fileReader = new FileReader()
		
		const handleFileRead = (e) => {
			let importedBookmarks = JSON.parse(fileReader.result)
			let bookmarks = []
			let folders = []

			let validJSON = validate(importedBookmarks);
			if (!validJSON) {
				this.setError("Invalid JSON file!")
				return
			}

			bookmarks = this.state.bookmarks.concat(importedBookmarks.bookmarks)
			folders = this.state.folders.concat(importedBookmarks.folders)

			this.setState(state => ({
				folders: folders,
				bookmarks: bookmarks
			}))
		}
		
		fileReader.onloadend = handleFileRead
		fileReader.readAsText(file)
	}

	exportBookmarks = () => {
		let data = new Blob([
			JSON.stringify({
					folders: this.state.folders,
					bookmarks: this.state.bookmarks
				}, 0, 4)
			], {type: 'text/json'}
		)
		let jsonURL = window.URL.createObjectURL(data)
		let a = document.createElement("a");
		document.body.appendChild(a);
		a.style = "display: none";
		a.href = jsonURL;
		a.download = 'bookmarks.json';
		a.click();
		window.URL.revokeObjectURL(jsonURL);
	}

	render() {
		return (
			<div className="App">
				{this.state.error ?
					<Alert
						variant="danger"
						onClose={() => this.setError(null)}
						dismissible
					>
						{this.state.error}
					</Alert> : <span></span>
				}
				<Navbar className="mb-2" style={this.state.colorScheme.navbar} expand="sm">
					<Nav className="mr-3">
						{this.state.currentFolderId || this.state.settings ?
							<Button
								size="sm"
								className="shadow-none"
								style={this.state.colorScheme.navbarBtns}
								onClick={() => this.goBack()}
							><IoIosArrowBack/>
							</Button> : <span></span>
						}
					</Nav>
					<Nav className="mr-auto">
						{this.getTitle()}
					</Nav>
					<Nav className="mr-2">
						{!this.state.settings ?
							<AddBookmarkBtn
								folders={this.state.folders}
								setFolders={this.setFolders}
								bookmarks={this.state.bookmarks}
								setBookmarks={this.setBookmarks}
								currentFolderId={this.state.currentFolderId}
								colorScheme={this.state.colorScheme}
							/> : <span></span>
						}
					</Nav>
					<Nav className="mr-2">
						{!this.state.settings ?
							<AddFolderModal
								folders={this.state.folders}
								setFolders={this.setFolders}
								currentFolderId={this.state.currentFolderId}
								colorScheme={this.state.colorScheme}
							/> : <span></span>
						}
					</Nav>
					<Nav>
						{!this.state.settings ?
							<Button
								size="sm"
								className="shadow-none"
								style={this.state.colorScheme.navbarBtns}
								onClick={() => this.toggleSettings()}
							><IoIosSettings/>
							</Button> : <span></span>
						}
					</Nav>
				</Navbar>

				{this.state.settings ?
					<section>
						<Settings
							toggleSettings={this.toggleSettings}
							toggleColorScheme={this.toggleColorScheme}
							colorScheme={this.state.colorScheme}
							importBookmarks={this.importBookmarks}
							exportBookmarks={this.exportBookmarks}
							folders={this.state.folders}
							setFolders={this.setFolders}
							bookmarks={this.state.bookmarks}
							setBookmarks={this.setBookmarks}
						/>
					</section> :
					<section>
						{this.state.bookmarks.length === 0 && this.state.folders.length === 0 ? <CustomToast/> : <span></span>}
						<Folders
							folders={this.state.folders}
							setFolders={this.setFolders}
							bookmarks={this.state.bookmarks}
							setBookmarks={this.setBookmarks}
							moveFolder={this.moveFolder}
							currentFolderId={this.state.currentFolderId}
							childrenFolders={this.getChildrenFolders()}
							setCurrentFolder={this.setCurrentFolder}
							colorScheme={this.state.colorScheme}
						/>
						<Bookmarks
							folders={this.state.folders}
							setFolders={this.setFolders}
							bookmarks={this.state.bookmarks}
							setBookmarks={this.setBookmarks}
							moveBookmark={this.moveBookmark}
							currentFolderId={this.state.currentFolderId}
							childrenBookmarks={this.getChildrenBookmarks()}
							colorScheme={this.state.colorScheme}
						/>
					</section>
				}
			</div>
		)
	}
}

export default App
