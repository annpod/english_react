import React from 'react';

const ListItem = ({ index, titles, item, updateInput, editWord, addWord, deleteWord }) => {
	<tr>
		<td>
			{isEdit && index === indexEdit ?
				<input className="input-edit"  name="editWord" value={editWord} onChange={updateInput}/>
				:
				<div className="table-text">{item.word}</div>
			}
			</td>
			<td key={`${index}2`}>
				{isEdit && index === indexEdit ?
					<input className="input-edit"  name="editTranslation" value={editTranslation} onChange={updateInput}/>
					:
					<div className="table-text">{item.translation}</div>
				}
				</td>
			<td>
			{isEdit && index === indexEdit ?
				<span>
					<button className="button-image button-image_save" onClick={this.saveEditWord}>
						<FontAwesomeIcon icon="save" />
					</button>
					<button className="button-image button-image_cancel" onClick={() => cancelEditWord(index)}>
						<FontAwesomeIcon icon="ban" />
					</button>
				</span>
				:
				<span>
					<button onClick={() => editWord(index)} className="button-image button-image_edit">
						<FontAwesomeIcon icon={faPencilAlt} />
					</button>
					<button onClick={() => deleteWord(index)} className="button-image button-image_delete">
						<FontAwesomeIcon icon="trash-alt" />
					</button>
				</span>
			}

		</td>
	</tr>
}

export default ListItem;