'use client';

import React, { useState } from 'react';
import { RotateCcw, Plus, Trash, ChevronDown } from 'lucide-react';
import { Listbox } from '@headlessui/react';

type Header = { key: string; value: string };

const ApiTesterPage: React.FC = () => {
    const [url, setUrl] = useState('');
    const [method, setMethod] = useState('POST');
    const [authToken, setAuthToken] = useState('');
    const [body, setBody] = useState('');
    const [headers, setHeaders] = useState<Header[]>([{ key: '', value: '' }]);
    const [file, setFile] = useState<File | null>(null);
    const [tab, setTab] = useState<'body' | 'headers' | 'auth' | 'file'>('body');

    // NEW: Response tab and response details state
    const [responseTab, setResponseTab] = useState<'body' | 'headers' | 'status'>('body');
    const [responseBody, setResponseBody] = useState('');
    const [responseHeaders, setResponseHeaders] = useState<Record<string, string>>({});
    const [responseStatus, setResponseStatus] = useState<number | null>(null);

    const [error, setError] = useState('');
    const methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];

    const handleSend = async () => {
        try {
            setError('');
            setResponseBody('');
            setResponseHeaders({});
            setResponseStatus(null);

            const reqHeaders: Record<string, string> = headers.reduce((acc, { key, value }) => {
                if (key) acc[key] = value;
                return acc;
            }, {} as Record<string, string>);

            if (authToken) {
                reqHeaders['Authorization'] = `Bearer ${authToken}`;
            }

            let bodyData: BodyInit | null = null;

            if (file && tab === 'file') {
                const formData = new FormData();
                formData.append('file', file);
                bodyData = formData;
            } else if (body && tab === 'body') {
                bodyData = body;
                reqHeaders['Content-Type'] = 'application/json';
            }

            const res = await fetch(url, {
                method,
                headers: bodyData instanceof FormData ? undefined : reqHeaders,
                body: ['GET', 'HEAD'].includes(method) ? null : bodyData,
            });

            // Capture status code
            setResponseStatus(res.status);

            // Capture headers
            const resHeaders: Record<string, string> = {};
            res.headers.forEach((value, key) => {
                resHeaders[key] = value;
            });
            setResponseHeaders(resHeaders);

            // Parse response body text
            const text = await res.text();

            try {
                const json = JSON.parse(text);
                setResponseBody(JSON.stringify(json, null, 2));
            } catch {
                setResponseBody(text);
            }
        } catch (err: any) {
            setError(err.message || 'Unknown error');
        }
    };

    const reset = () => {
        setUrl('');
        setMethod('POST');
        setAuthToken('');
        setBody('');
        setHeaders([{ key: '', value: '' }]);
        setFile(null);
        setResponseBody('');
        setResponseHeaders({});
        setResponseStatus(null);
        setError('');
        setTab('body');
        setResponseTab('body');
    };

    return (
        <main className="max-w-6xl mx-auto p-3 mt-3">
            <div className="bg-white/70 backdrop-blur-lg shadow-xl rounded-xl p-8 border border-[#eeb6f3]">
                <div className="flex justify-between items-center mb-3">
                    <h1 className="text-4xl font-extrabold text-[#6e3d73] tracking-tight">🌐 API Tester</h1>
                    <button
                        onClick={reset}
                        className="flex items-center gap-1 text-sm text-[#a931a2] hover:text-[#6e3d73] transition"
                        title="Reset"
                    >
                        <RotateCcw size={18} />
                        Reset
                    </button>
                </div>

                {/* URL + Method + Send Button */}
                <div className="flex flex-col md:flex-row gap-3 mb-3 items-stretch">
                    <Listbox value={method} onChange={setMethod}>
                        <div className="relative w-full md:w-28">
                            <Listbox.Button className="w-full p-2 border border-[#eeb6f3] rounded-lg bg-[#faf0ff] text-[#6e3d73] flex justify-between items-center shadow-sm focus:outline-none focus:ring-2 focus:ring-[#a931a2]">
                                {method}
                                <ChevronDown className="m-2 ml-2 h-6 w-4 text-[#a931a2]" />
                            </Listbox.Button>
                            <Listbox.Options className="absolute z-10 w-full bg-white border border-[#eeb6f3] rounded shadow-md">
                                {methods.map((m) => (
                                    <Listbox.Option
                                        key={m}
                                        value={m}
                                        className={({ active }) =>
                                            `cursor-pointer px-2 py-2 ${active ? 'bg-[#eeb6f3] text-[#6e3d73]' : 'text-[#6e3d73]'}`
                                        }
                                    >
                                        {m}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </div>
                    </Listbox>

                    <input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="https://api.example.com/endpoint"
                        className="flex-1 p-3 border border-[#eeb6f3] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#a931a2]"
                    />

                    <button
                        onClick={handleSend}
                        className="w-full md:w-auto bg-gradient-to-r from-[#a931a2] to-[#c248c8] text-white py-3 px-6 rounded-md shadow hover:opacity-90 transition"
                    >
                        Send
                    </button>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-3">
                    <div>
                        <h2 className="font-semibold text-[#a931a2] mb-3">Request</h2>
                        {/* Tabs */}
                        <div className="flex gap-6 mb-3">
                            {['body', 'headers', 'auth', 'file'].map((t) => (
                                <button
                                    key={t}
                                    onClick={() => setTab(t as any)}
                                    className={`py-2 px-4 border-b-2 ${
                                        tab === t
                                            ? 'border-[#a931a2] text-[#a931a2] font-semibold'
                                            : 'border-transparent text-gray-500 hover:text-[#a931a2]'
                                    } transition`}
                                >
                                    {t.charAt(0).toUpperCase() + t.slice(1)}
                                </button>
                            ))}
                        </div>

                        {/* Tab Panels */}
                        {tab === 'body' && (
                            <textarea
                                value={body}
                                onChange={(e) => setBody(e.target.value)}
                                placeholder="Raw JSON body"
                                rows={5}
                                className="w-full p-4 border border-[#eeb6f3] rounded-lg font-mono resize-none shadow-sm focus:outline-none focus:ring-2 focus:ring-[#a931a2] "
                            />
                        )}

                        {tab === 'headers' && (
                            <div className="mb-3">
                                <div className="grid grid-cols-12 font-semibold text-[#a931a2] mb-3">
                                    <span className="col-span-5">Key</span>
                                    <span className="col-span-5">Value</span>
                                    <span className="col-span-2 text-right">Actions</span>
                                </div>

                                {headers.map((header, index) => (
                                    <div key={index} className="grid grid-cols-12 gap-3 mb-3 items-center">
                                        <input
                                            type="text"
                                            placeholder="Header Key"
                                            className="col-span-5 p-3 border border-[#eeb6f3] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#a931a2]"
                                            value={header.key}
                                            onChange={(e) => {
                                                const newHeaders = [...headers];
                                                newHeaders[index].key = e.target.value;
                                                setHeaders(newHeaders);
                                            }}
                                        />
                                        <input
                                            type="text"
                                            placeholder="Header Value"
                                            className="col-span-5 p-3 border border-[#eeb6f3] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#a931a2]"
                                            value={header.value}
                                            onChange={(e) => {
                                                const newHeaders = [...headers];
                                                newHeaders[index].value = e.target.value;
                                                setHeaders(newHeaders);
                                            }}
                                        />
                                        <div className="col-span-2 text-right space-x-2">
                                            <button
                                                onClick={() => {
                                                    const newHeaders = headers.filter((_, i) => i !== index);
                                                    setHeaders(newHeaders);
                                                }}
                                                className="text-red-500 hover:text-red-700"
                                                title="Remove Header"
                                            >
                                                <Trash size={20} />
                                            </button>
                                            {index === headers.length - 1 && (
                                                <button
                                                    onClick={() => setHeaders([...headers, { key: '', value: '' }])}
                                                    className="text-green-600 hover:text-green-800"
                                                    title="Add Header"
                                                >
                                                    <Plus size={20} />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}

                                {headers.length === 0 && (
                                    <button
                                        onClick={() => setHeaders([{ key: '', value: '' }])}
                                        className="text-sm text-[#a931a2] hover:text-[#6e3d73] flex items-center gap-2"
                                    >
                                        <Plus size={18} />
                                        Add Header
                                    </button>
                                )}
                            </div>
                        )}

                        {tab === 'auth' && (
                            <div className="mb-3">
                                <label className="block text-[#a931a2] font-semibold mb-2">Bearer Token</label>
                                <input
                                    type="text"
                                    placeholder="Enter your token"
                                    value={authToken}
                                    onChange={(e) => setAuthToken(e.target.value)}
                                    className="w-full p-3 border border-[#eeb6f3] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#a931a2]"
                                />
                            </div>
                        )}

                        {tab === 'file' && (
                            <div className="mb-3">
                                <label className="block text-[#a931a2] font-semibold mb-2">Upload File</label>
                                <div className="flex items-center p-3 space-x-6 border border-[#a931a2] rounded-lg shadow-sm">
                                    <label
                                        htmlFor="file-upload"
                                        className="cursor-pointer bg-gradient-to-r from-[#a931a2] to-[#c248c8] text-white py-3 px-6 rounded-md select-none hover:opacity-90 transition"
                                    >
                                        Choose File
                                    </label>
                                    <span className="text-[#6e3d73] truncate max-w-xs" title={file?.name || ''}>
                                        {file ? file.name : 'No file chosen'}
                                    </span>
                                </div>
                                <input
                                    id="file-upload"
                                    type="file"
                                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                                    className="hidden"
                                />
                            </div>
                        )}
                    </div>

                    <div>
                        <h2 className="font-semibold text-[#a931a2] mb-3">Response</h2>

                        {/* Response Tabs */}
                        <div className="flex gap-6 mb-3">
                            {['body', 'headers', 'status'].map((t) => (
                                <button
                                    key={t}
                                    onClick={() => setResponseTab(t as any)}
                                    className={`py-2 px-4 border-b-2 ${
                                        responseTab === t
                                            ? 'border-[#a931a2] text-[#a931a2] font-semibold'
                                            : 'border-transparent text-gray-500 hover:text-[#a931a2]'
                                    } transition`}
                                >
                                    {t.charAt(0).toUpperCase() + t.slice(1)}
                                </button>
                            ))}
                        </div>

                        {/* Response Tab Panels */}
                        {responseTab === 'body' && (
                            <textarea
                                readOnly
                                value={error || responseBody}
                                rows={5}
                                className={`w-full p-4 rounded-lg font-mono resize-none border shadow-sm ${
                                    error ? 'border-red-500 text-red-500 bg-white' : 'border-[#a931a2] bg-[#faf0ff]'
                                } focus:outline-none`}
                            />
                        )}

                        {responseTab === 'headers' && (
                            <div className=" font-mono text-sm border border-[#a931a2] rounded-lg p-4 bg-[#faf0ff] max-h-40 overflow-auto">
                                {Object.keys(responseHeaders).length === 0 ? (
                                    <p className="text-gray-500">No headers received</p>
                                ) : (
                                    Object.entries(responseHeaders).map(([key, value]) => (
                                        <div key={key} className="flex justify-between border-b border-[#eeb6f3] py-1 last:border-none">
                                            <span className="font-semibold text-[#6e3d73]">{key}</span>
                                            <span className="text-[#a931a2] truncate max-w-xs">{value}</span>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}

                        {responseTab === 'status' && (
                            <div className=" font-mono text-lg border border-[#a931a2] rounded-lg p-6 bg-[#faf0ff] flex justify-center items-center text-[#6e3d73]">
                                {responseStatus !== null ? (
                                    <>
                                        <span className="font-semibold mr-2">Status Code:</span>
                                        <span>{responseStatus}</span>
                                    </>
                                ) : (
                                    <span className="text-gray-500">No status code</span>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ApiTesterPage;
