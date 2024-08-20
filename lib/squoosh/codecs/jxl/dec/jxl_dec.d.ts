export interface JXLModule extends EmscriptenWasm.Module {
  decode(data: BufferSource): ImageData | null
}

declare let moduleFactory: EmscriptenWasm.ModuleFactory<JXLModule>

export default moduleFactory
