import { Dialog } from "@headlessui/react";

export const SaveToPlaylistModal = ({ isOpen, setIsOpen, handleSaveToPlaylist, savePlaylistVideo, setSavePlaylistVideo, userPlaylists }) => {
  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="fixed z-20 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                  Save to playlist:
                </Dialog.Title>
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
                              className="mr-2 text-blue-600 focus:ring-blue-500 h-4 w-4"
                            />
                            <span className="ml-2 text-gray-700">{playlist.name}</span>
                          </label>
                        );
                      })}
                    </fieldset>
                  </div>
                  <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                    <button type="button" className="btn-primary w-full sm:w-auto sm:ml-3" onClick={(event) => handleSaveToPlaylist(event)}>
                      Save
                    </button>
                    <button type="button" className="btn-cancel mt-3 w-full sm:w-auto sm:mt-0" onClick={() => setIsOpen(false)}>
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
};
