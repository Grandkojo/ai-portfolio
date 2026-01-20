export default function AdminMessages() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-white">Messages</h1>

            <div className="p-12 rounded-2xl border-2 border-dashed border-white/20 flex flex-col items-center justify-center text-center opacity-50">
                <p className="text-white/40 mb-2">Inbox is empty</p>
                <p className="text-sm text-white/30">Messages from your contact form will appear here</p>
            </div>
        </div>
    );
}
