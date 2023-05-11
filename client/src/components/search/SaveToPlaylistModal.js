import { Dialog } from "@headlessui/react";

export const SaveToPlaylistModal = ({ isOpen, setIsOpen, handleSaveToPlaylist, savePlaylistVideo, setSavePlaylistVideo, userPlaylists }) => {
	return (
		<Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-20">
			<div className="fixed inset-0 bg-gradient-to-br from-cyan-100/60 to-blue-300/60" aria-hidden="true" />
			<div className="fixed inset-0 flex items-center justify-center p-4">
				<div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm">
					<div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
						<div className="sm:flex sm:items-start">
							<div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
								<svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
								</svg>
							</div>
							<div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
								<h3 className="text-lg font-medium leading-6 text-gray-900">Save to playlist:</h3>
								<form>
									<div className="my-4 grid place-content-center">
										<fieldset>
											{userPlaylists.map((playlist) => {
												return (
													<label key={playlist.id} className="mb-2 flex items-center text-base">
														<input
															type="radio"
															name="playlist"
															value={playlist.id}
															checked={savePlaylistVideo.playlistId === playlist.id}
															onChange={(event) => {
																const copy = { ...savePlaylistVideo };
																copy.playlistId = parseInt(event.target.value);
																setSavePlaylistVideo(copy);
															}}
															className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500"
														/>
														<span className="ml-2 text-gray-700">{playlist.name}</span>
													</label>
												);
											})}
										</fieldset>
									</div>
								</form>
							</div>
						</div>
					</div>
					<div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
						<button type="button" className="btn-primary" onClick={(event) => handleSaveToPlaylist(event)}>
							Save
						</button>
						<button type="button" className="btn-cancel" onClick={() => setIsOpen(false)}>
							Cancel
						</button>
					</div>
				</div>
			</div>
		</Dialog>
	);
};
