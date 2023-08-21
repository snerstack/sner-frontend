import NumberField from '@/components/Fields/NumberField'
import RadioField from '@/components/Fields/RadioField'
import SubmitField from '@/components/Fields/SubmitField'
import TagsField from '@/components/Fields/TagsField'
import TextAreaField from '@/components/Fields/TextAreaField'
import TextField from '@/components/Fields/TextField'
import Heading from '@/components/Heading'
import { useState } from 'react'

const VulnAddPage = () => {
  const [address, setAddress] = useState<string>('')
  const [hostname, setHostname] = useState<string>('')
  const [port, setPort] = useState<number | null>(null)
  const [proto, setProto] = useState<string>('')
  const [hostId, setHostId] = useState<number | null>(null)
  const [serviceId, setServiceId] = useState<number | null>(null)
  const [viaTarget, setViaTarget] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [xtype, setXtype] = useState<string>('')
  const [severity, setSeverity] = useState<{ options: string[]; selected: string }>({
    options: ['unknown', 'info', 'low', 'medium', 'high', 'critical'],
    selected: 'info',
  })
  const [descr, setDescr] = useState<string>('')
  const [data, setData] = useState<string>('')
  const [refs, setRefs] = useState<string>('')
  const [tags, setTags] = useState<string[]>([])
  const [comment, setComment] = useState<string>('')

  const addVulnHandler = () => {}
  return (
    <div>
      <Heading headings={['Vulns', 'Add']} />
      <form id="service_form" method="post">
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">
            <a data-toggle="collapse" href="#refs_collapse">
              Host, Service
            </a>
          </label>
          <div className="col-sm-10">
            <div className="form-control-plaintext">
              {address} ({hostname}) {port && port + '/' + proto}
            </div>
          </div>
        </div>
        <div id="refs_collapse" className="collapse">
          <NumberField
            name="host_id"
            label="Host ID"
            placeholder="Host ID"
            required={true}
            horizontal={true}
            _state={hostId}
            _setState={setHostId}
          />
          <NumberField
            name="service_id"
            label="Service ID"
            placeholder="Service ID"
            horizontal={true}
            _state={serviceId}
            _setState={setServiceId}
          />
          <TextField
            name="via_target"
            label="Via target"
            placeholder="Via target"
            horizontal={true}
            _state={viaTarget}
            _setState={setViaTarget}
          />
        </div>
        <TextField
          name="name"
          label="Name"
          placeholder="Name"
          required={true}
          horizontal={true}
          _state={name}
          _setState={setName}
        />
        <TextField
          name="xtype"
          label="xType"
          placeholder="xType"
          horizontal={true}
          _state={xtype}
          _setState={setXtype}
        />
        <RadioField
          name="severity"
          label="Severity"
          required={true}
          horizontal={true}
          _state={severity}
          _setState={setSeverity}
        />
        <TextAreaField
          name="descr"
          label="Descr"
          placeholder="Descr"
          rows={15}
          horizontal={true}
          _state={descr}
          _setState={setDescr}
        />
        <TextAreaField
          name="data"
          label="Data"
          placeholder="Data"
          rows={10}
          horizontal={true}
          _state={data}
          _setState={setData}
        />
        <TextAreaField
          name="refs"
          label="Refs"
          placeholder="Refs"
          rows={3}
          horizontal={true}
          _state={refs}
          _setState={setRefs}
        />
        <TagsField
          name="tags"
          label="Tags"
          placeholder="Tags"
          defaultTags={['Falsepositive', 'Info', 'Report', 'Report:data', 'Reviewed', 'Sslhell', 'Todo']}
          horizontal={true}
          _state={tags}
          _setState={setTags}
        />
        <TextAreaField
          name="comment"
          label="Comment"
          placeholder="Comment"
          rows={2}
          horizontal={true}
          _state={comment}
          _setState={setComment}
        />
        <SubmitField name="Add" horizontal={true} handler={addVulnHandler} />
      </form>
    </div>
  )
}
export default VulnAddPage
