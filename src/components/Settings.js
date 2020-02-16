import React from 'react'

import { Alert, Button, Table } from 'react-bootstrap'


export function Settings(props) {
	let toggleColorScheme = props.toggleColorScheme
	let colorScheme = props.colorScheme
	let importBookmarks = props.importBookmarks
	let exportBookmarks = props.exportBookmarks

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
							<span style={colorScheme.settingsText}>Import bookmarks</span>
						</td>
						<td>
							<input
								size="sm"
								className="shadow-none"
								style={colorScheme.navbarBtns}
								type="file"
								accept=".json"
								onChange={(e)=> {
									importBookmarks(e.target.files[0])}
								}
							/>
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
