import { Dialog } from "@headlessui/react";
import { UserVideosList } from "../user/UserVideosList";

export const ExpandedPlaylistDetailsModal = ({ isOpen, setIsOpen, videos, userPlaylists }) => {
	return (
		<Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-10">
			<div className="fixed inset-0 bg-black/70" aria-hidden="true" />
			<div className="fixed inset-0 flex items-center justify-center p-4">
				<div className="overflow-y-auto bg-gradient-to-br from-cyan-100 to-blue-300 p-6" style={{ maxHeight: "90vh" }}>
					<Dialog.Panel>
						<div>
							<UserVideosList videos={videos} userPlaylists={userPlaylists}/>
						</div>
					</Dialog.Panel>
				</div>
			</div>
		</Dialog>
	);
};
