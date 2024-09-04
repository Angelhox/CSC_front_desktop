/* eslint-disable react/no-unknown-property */
import { useState, useRef, useEffect } from 'react'
import './SorteableBars.scss'
import { IconType } from 'react-icons'
import { FcApproval, FcHighPriority } from 'react-icons/fc'
export interface BarsItems {
  index: number
  title: string
  label: string
  image?: string
  icon: IconType
  loading: boolean
  error: string | null
  success: boolean
  onClick: () => void
}
interface Props {
  dataSorteable?: BarsItems[]
}
export function SorteableBars({ dataSorteable }: Props): JSX.Element {
  const [data, setData] = useState<BarsItems[] | undefined>(dataSorteable)
  const refs = useRef<(HTMLLIElement | null)[]>([])
  const ulRef = useRef<HTMLUListElement | null>(null)
  let current_pos: number
  let drop_pos: number
  useEffect(() => {
    setData(dataSorteable)
  }, [dataSorteable])
  const handleDragStart = (index: number): void => {
    if (ulRef.current) {
      if (refs.current[index]) {
        current_pos = parseInt(refs.current[index]!.getAttribute('list-pos') || '0')
      }
      const ul = ulRef.current
      ul.style.height = ul.clientHeight + 'px'
      // setTimeout(() => {
      //   refs.current[index]!.style.display = "none";
      // }, 0);

      //   ul.style.height =
      //     ul.clientHeight - refs.current[index]?.clientHeight + "px";
      // }
    }
  }
  const handleDragEnd = (index: number): void => {
    refs.current[index]!.style.display = 'flex'
    refs.current.forEach((ref) => {
      ref?.classList.remove('active')
    })
  }
  const handleDragEnter = (index: number): void => {
    refs.current[index]!.className = 'active'
  }
  const handleDragLeave = (index: number): void => {
    refs.current[index]!.classList.remove('active')
  }
  const handleDrop = (e: React.DragEvent<HTMLLIElement>, index: number): void => {
    e.preventDefault()
    if (ulRef.current) {
      if (refs.current[index]) {
        drop_pos = parseInt(refs.current[index]!.getAttribute('list-pos') || '0')
      }
      console.log(drop_pos, current_pos)
      dataSorteable?.splice(drop_pos, 0, dataSorteable?.splice(current_pos, 1)[0])
      if (dataSorteable) {
        const dataUpdated: BarsItems[] = dataSorteable?.map((item, i) => ({
          index: i,
          title: item.title,
          label: item.label,
          icon: item.icon,
          loading: item.loading,
          error: item.error,
          success: item.success,
          onClick: item.onClick
        }))
        setData(dataUpdated)
      }
      //   const ul = ulRef.current;
      //   ul.style.height =
      //     ul.clientHeight - refs.current[index]!.clientHeight + "px";
    }
  }
  return (
    <div className="ContainerBars">
      <ul ref={ulRef}>
        {data?.map((element, i) => {
          return (
            <li
              key={i}
              list-pos={i}
              ref={(el) => (refs.current[i] = el)}
              draggable={true}
              onDragStart={() => handleDragStart(i)}
              onDragEnter={() => handleDragEnter(i)}
              onDragLeave={() => handleDragLeave(i)}
              onDragEnd={() => handleDragEnd(i)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e, i)}
              onClick={element.onClick}
            >
              <div className="user">
                {element.image ? <img src={element.image} alt="no file" /> : <element.icon />}

                <div className="info">
                  <h2>{element.title}</h2>
                  {
                    element.loading ? (
                      <p>Loading...</p>
                    ) : (
                      (element.label && <p>{element.label}</p>) ||
                      (element.error && <p>{element.error}</p>)
                    )
                    // (
                    //   (element.error && <p>{element.error}</p>) ||
                    //   (element.role && <p>{element.role}</p>)
                    // )
                  }
                  {/* {element.error && <p>{element.error}</p>}
                  {element.role && <p>{element.role}</p>} */}
                </div>
              </div>
              {/* <h1 className="icon">&#10978;</h1> */}
              {(element.error && (
                <h1 className="icon">
                  <FcHighPriority />
                </h1>
              )) ||
                (element.success && (
                  <h1 className="icon">
                    <FcApproval />
                  </h1>
                ))}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
