require "json"

json = File.read(File.join(__dir__, "package.json"))
package = JSON.parse(json).deep_symbolize_keys

workspace '/Users/katiecheng/quest'

Pod::Spec.new do |s|
  s.name = package[:name]
  s.version = package[:version]
  s.summary = package[:description]
  s.license = { type: "MIT" }
  s.author = package[:author]
  s.homepage = package[:homepage]
  s.source = { git: package[:repository] }
  s.source_files = "ios/*"
  s.platform = :ios, "8.0"

  s.dependency "LookbackSafe", "~> 1.4.1"
  s.dependency "React"
end