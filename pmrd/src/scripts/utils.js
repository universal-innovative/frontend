
export const addIcon = (iconClass, element)=>{
    const icon = document.createElement('i')
    icon.className = iconClass
    icon.style.fontSize = '24px'
    element.appendChild(icon)
}
export const replaceIcon = (iconClass, element) => {
  const icon = document.createElement('i');
  icon.className = iconClass;
  icon.style.fontSize = '24px';

  const currentIcon = element.querySelector('i');
  
  if (currentIcon) {
      element.replaceChild(icon, currentIcon);
  } else {
      element.appendChild(icon);
  }
};
export const sortIcon = (sortOrder, element)=>{
   if (sortOrder === 1){
    replaceIcon('fas fa-arrow-up', element)
   }
  else if(sortOrder === -1){
    replaceIcon('fas fa-arrow-down', element)
   }
   else{
    replaceIcon('fas fa-sort', element)
   }
}
export const renderInput = (parent, inputClass,type, id, placeHolder, otherAttributes, onChangeCallback )=>{
      const input = document.createElement('input');
      input.className = inputClass;
      input.setAttribute('type', type);
      input.setAttribute('id', id);
      input.setAttribute('placeHolder', placeHolder);
      input.setAttribute('height', '30px');
      input.setAttribute('width', '100px');
      if (otherAttributes){
        otherAttributes.forEach(attribute => input.setAttribute(attribute))
      }
      if (onChangeCallback) {
        input.addEventListener('input', onChangeCallback);
    }
      const currentInput = parent.querySelector('input');
  
      if (currentInput) {
          parent.replaceChild(input, currentInput);
      } else {
          parent.appendChild(input);
      }
     parent.appendChild(input)
}
export const renderPaginator = (parent, onPrev,onNext )=>{

 const container = document.createElement('div');
 parent.appendChild(container);
 const buttonPrev = document.createElement('button');
 addIcon('fas fa-chevron-left', buttonPrev)
 const buttonNext = document.createElement('button');
 addIcon('fas fa-chevron-right', buttonNext)
 container.appendChild(buttonPrev)
 container.appendChild(buttonNext)

 if(onPrev && onNext){
  buttonPrev.onclick = onPrev
  buttonNext.onclick = onNext
 }
}