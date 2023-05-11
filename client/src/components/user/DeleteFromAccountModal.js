import { Dialog } from "@headlessui/react";

export const DeleteFromAccountModal = ({ isOpenDeleteFromAccount, setIsOpenDeleteFromAccount, handleDeleteFromAccount }) => {
	return (
		<Dialog open={isOpenDeleteFromAccount} onClose={() => setIsOpenDeleteFromAccount(false)} className="relative z-50">
			<div className="fixed inset-0 bg-gradient-to-br from-cyan-100/60 to-blue-300/60" aria-hidden="true" />
			<div className="fixed inset-0 flex items-center justify-center p-4">
				<div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
					<div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
						<div className="sm:flex sm:items-start">
							<div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
								<svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
									/>
								</svg>
							</div>
							<div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
								<h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">
									Delete Video
								</h3>
								<div className="mt-2">
									<p className="text-sm text-gray-500">
										Are you sure you want to remove this video from your account? This will remove the video from any associated playlists as well.
									</p>
								</div>
							</div>
						</div>
					</div>
					<div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
						<button
							onClick={handleDeleteFromAccount}
							type="button"
							className="btn-delete"
						>
							Delete
						</button>
						<button
							type="button"
							onClick={() => setIsOpenDeleteFromAccount(false)}
							className="btn-cancel"
						>
							Cancel
						</button>
					</div>
				</div>
			</div>
		</Dialog>
	);
};
