function Button(props) {
  return (
    <button {...props} className='bg-slate-600 text-white rounded-md px-4 py-2 font-medium'>
      {props.children}
    </button>
  )
}

export default Button