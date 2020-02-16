/*global chrome*/
import React, { Component } from 'react'
import '../styles/App.css'

import { Bookmarks, AddBookmarkBtn} from './Bookmark.js'
import { CustomToast } from './CustomToast.js'
import { Folders, AddFolderModal } from './Folder.js'
import { lightTheme, darkTheme, backgroundColor } from '../constants/Themes.js'
import { Settings } from './Settings.js'

import { Button, Nav, Navbar } from 'react-bootstrap'
import { IoIosArrowBack, IoIosSettings } from 'react-icons/io'
import localStorage from 'local-storage'


class App extends Component {

	state = {
		currentFolderId: null,
		currentFolderName: null,
		folders: [],
		bookmarks: [],
		settings: false,
		colorScheme: lightTheme
	}

	componentDidMount() {
		let local_state = localStorage.get('state')
		if (local_state !== null && local_state.length !== {}) {
			this.setState(local_state)

			if (local_state.colorScheme.darkMode) {
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

	setFolders = (folders) => {
		this.setState(state => ({
			folders: folders
		}))
	}

	setBookmarks = (bookmarks) => {
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

		let filtered_folders = this.state.folders.filter(fl => {
			return fl.folderId === this.state.currentFolderId
		})

		let parent_folder = this.state.folders.filter(fl => {
			return fl.folderId === filtered_folders[0].parentFolderId
		})

		if (parent_folder.length > 0) {
			this.setState(state => ({
				currentFolderId: parent_folder[0].folderId,
				currentFolderName: parent_folder[0].name,
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
			let imported_bookmarks = JSON.parse(fileReader.result)
			this.setState(state => ({
				folders: imported_bookmarks.folders,
				bookmarks: imported_bookmarks.bookmarks
			}))
		}
		
		fileReader.onloadend = handleFileRead
		fileReader.readAsText(file)
	}

	exportBookmarks = () => {
		let data = new Blob([
			JSON.stringify({
					folders: this.state.folders,
					bookmarks:this.state.bookmarks
				})
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
							toggleColorScheme={this.toggleColorScheme}
							colorScheme={this.state.colorScheme}
							importBookmarks={this.importBookmarks}
							exportBookmarks={this.exportBookmarks}
						/>
					</section> :
					<section>
						{this.state.bookmarks.length === 0 && this.state.folders.length === 0 ? <CustomToast/> : <span></span>}
						<Folders
							folders={this.state.folders}
							setFolders={this.setFolders}
							bookmarks={this.state.bookmarks}
							setBookmarks={this.setBookmarks}
							currentFolderId={this.state.currentFolderId}
							setCurrentFolder={this.setCurrentFolder}
							colorScheme={this.state.colorScheme}
						/>
						<Bookmarks
							bookmarks={this.state.bookmarks}
							setBookmarks={this.setBookmarks}
							currentFolderId={this.state.currentFolderId}
							colorScheme={this.state.colorScheme}
						/>
					</section>
				}
			</div>
		)
	}
}

export default App
