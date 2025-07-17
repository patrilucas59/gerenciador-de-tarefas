function  TextArea(props) {
  return (
    <textarea 
    className="w-full p-2 border border-slate-700 rounded-md outline-slate-400 resize-none"
      {...props}
    />
  )
}

export default TextArea
