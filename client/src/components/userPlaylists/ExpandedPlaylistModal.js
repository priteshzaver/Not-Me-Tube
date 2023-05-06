import { Dialog } from "@headlessui/react";
import { UserVideosList } from "../user/UserVideosList";

export const ExpandedPlaylistDetailsModal = ({ isOpen, setIsOpen, videos }) => {
	return (
		<Dialog
			open={isOpen}
			onClose={() => setIsOpen(false)}
			className="relative z-50"
		>
			<div className="fixed inset-0 bg-black/70" aria-hidden="true" />
			<div className="fixed inset-0 flex items-center justify-center p-4">
				<div
					className="overflow-y-auto bg-white p-8"
					style={{ maxHeight: "90vh" }}
				>
					<Dialog.Panel>
						<div>
							<UserVideosList videos={videos} />
						</div>
					</Dialog.Panel>
				</div>
			</div>
		</Dialog>
	);
};
