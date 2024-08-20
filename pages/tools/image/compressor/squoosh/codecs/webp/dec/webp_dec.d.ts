export interface WebPModule extends EmscriptenWasm.Module {
  decode(data: BufferSource): ImageData | null
}

declare let moduleFactory: EmscriptenWasm.ModuleFactory<WebPModule>

export default moduleFactory
