import React from 'react'

// On-screen Arabic keyboard. Calls onKey(char), onBackspace, onSpace.
const ROWS = [
  ['ض', 'ص', 'ث', 'ق', 'ف', 'غ', 'ع', 'ه', 'خ', 'ح', 'ج'],
  ['ش', 'س', 'ي', 'ب', 'ل', 'ا', 'ت', 'ن', 'م', 'ك', 'ط'],
  ['ئ', 'ء', 'ؤ', 'ر', 'ى', 'ة', 'و', 'ز', 'ظ', 'د'],
  ['ذ', 'إ', 'أ', 'آ', 'لا', 'ـ'],
]

// Harakat row (short vowels)
const HARAKAT = [
  { ch: '\u064E', label: 'َ' }, // fatha
  { ch: '\u0650', label: 'ِ' }, // kasra
  { ch: '\u064F', label: 'ُ' }, // damma
  { ch: '\u0652', label: 'ْ' }, // sukun
  { ch: '\u0651', label: 'ّ' }, // shadda
  { ch: '\u064B', label: 'ً' }, // tanwin fath
]

export default function ArabicKeyboard({ onKey, onBackspace, onSpace }) {
  return (
    <div dir="rtl" className="select-none rounded-2xl bg-surface p-2">
      {/* Harakat */}
      <div className="mb-1 flex justify-center gap-1">
        {HARAKAT.map((h) => (
          <Key key={h.ch} onClick={() => onKey(h.ch)} small accent>
            <span className="font-arabic text-lg">ـ{h.label}</span>
          </Key>
        ))}
      </div>
      {ROWS.map((row, i) => (
        <div key={i} className="mb-1 flex justify-center gap-1">
          {row.map((ch) => (
            <Key key={ch} onClick={() => onKey(ch)}>
              <span className="font-arabic text-xl">{ch}</span>
            </Key>
          ))}
        </div>
      ))}
      <div className="flex justify-center gap-1">
        <Key onClick={onSpace} wide>
          <span className="text-sm font-bold">bo'shliq</span>
        </Key>
        <Key onClick={onBackspace} danger>
          <span className="text-lg">⌫</span>
        </Key>
      </div>
    </div>
  )
}

function Key({ children, onClick, wide, danger, small, accent }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-10 items-center justify-center rounded-lg bg-white font-bold text-ink shadow-sm transition active:translate-y-0.5 active:bg-line ${
        wide ? 'flex-[3]' : 'flex-1'
      } ${danger ? 'bg-danger/10 text-danger' : ''} ${small ? 'h-8' : ''} ${
        accent ? 'bg-accent/10' : ''
      } min-w-0`}
    >
      {children}
    </button>
  )
}
